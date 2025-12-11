import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const detectMood = async (text) => {
  const MODEL = "j-hartmann/emotion-english-distilroberta-base"; 

  try {
    const response = await fetch(
      `https://router.huggingface.co/hf-inference/models/${MODEL}`, 
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("HF Error:", response.status, err);
      return "neutral";
    }

    const result = await response.json();
    const emotions = result[0];
    const top = emotions.reduce((max, curr) => 
      curr.score > max.score ? curr : max
    );

    console.log(`Mood: ${top.label} (score: ${top.score.toFixed(3)})`);
    return top.label;
  } catch (err) {
    console.error("Mood detection failed:", err.message);
    return "neutral";
  }
}
 

// export const getSolutions = async (req, res) => {
//   const { entryId } = req.body;
//   const userId = req.user.id;

//   if (!entryId) {
//     return res.status(400).json({ error: "entryId required" });
//   }

//   try {
//     // Get mood entry from database
//     const entry = await prisma.moodEntry.findUnique({
//       where: { id: entryId, userId },
//     });

//     if (!entry) {
//       return res.status(404).json({ error: "Entry not found" });
//     }

//     // Hugging Face API call
//     const MODEL = "mistralai/Mistral-7B-Instruct-v0.2";
    
//     const prompt = `You are a caring mental health companion. The user is feeling ${entry.detectedMood}.`;

//     console.log("Calling Hugging Face API...");

//     const response = await fetch(
//       `https://router.huggingface.co/hf-inference/models/${MODEL}`,  // ✅ FIXED
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: prompt,
//           parameters: {
//             top_p: 0.9,
//             return_full_text: false,
//           },
//         }),
//       }
//     );

//     if (!response.ok) {
//       const error = await response.text();
//       console.error("Hugging Face API Error:", error);
//       return res.status(503).json({ 
//         error: "AI service is currently unavailable. Please try again in a moment." 
//       });
//     }

//     const data = await response.json();
//     console.log("Hugging Face Response:", data);

//     // Extract AI response
//     let text = "";
//     if (Array.isArray(data) && data.length > 0) {
//       text = data[0]?.generated_text || "";
//     } else if (data.generated_text) {
//       text = data.generated_text;
//     }

//     text = text.trim();

//     if (!text || text.length < 20) {
//       console.log("Response too short or empty");
//       return res.status(500).json({ 
//         error: "AI failed to generate response. Please try again." 
//       });
//     }

//     console.log("Generated solution:", text);

//     // Save AI response to database
//     await prisma.moodEntry.update({
//       where: { id: entryId },
//       data: { solutions: JSON.stringify({ text }) },
//     });

//     res.json({ text });

//   } catch (err) {
//     console.error("Error:", err.message);
//     res.status(500).json({ 
//       error: "Failed to generate solution. Please try again." 
//     });
//   }
// };

export const getSolutions = async (req, res) => {
  const { entryId } = req.body;
  const userId = req.user.id;

  if (!entryId) {
    return res.status(400).json({ error: "entryId required" });
  }

  try {
    const entry = await prisma.moodEntry.findUnique({
      where: { id: entryId, userId },
    });

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

const prompt = `You are Mood Genius, an empathetic AI mental health coach dedicated to supporting emotional well-being.

**User's Day Summary:**
${entry.inputText}

**Detected Mood:** ${entry.detectedMood}

**Your Task:**
Provide a warm, personalized response that includes:

1. **Validation & Empathy:** Acknowledge their feelings and validate their experience
2. **Personalized Story or Analogy:** Share a brief, relatable story or metaphor (2-3 sentences) that connects to their situation
3. **Practical Activities:** Suggest 2-3 specific, actionable activities they can do right now to improve or maintain their mood
4. **Wellness Tip:** Offer one evidence-based mental health tip relevant to their emotional state
5. **Encouraging Closing:** End with a supportive message that empowers them

**Guidelines:**
- Keep your tone warm, conversational, and non-judgmental
- Make suggestions practical and easy to implement
- Avoid clinical language or diagnosis
- Be culturally sensitive and inclusive
- Length: 150-200 words
- Use "you" language to make it personal

Focus on helping them feel understood, supported, and equipped with tools to navigate their emotional journey.`;
    
console.log("Calling OpenRouter API (free model)...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",  
        "X-Title": "Mood Companion App",         
      },
      body: JSON.stringify({
        model: "amazon/nova-2-lite-v1:free", 
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        top_p: 0.9,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("API Error:", error);
      return res.status(503).json({ error: "AI service unavailable. Try again later." });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim() || "";

    if (!text || text.length < 20) {
      return res.status(500).json({ error: "AI failed to generate a useful response." });
    }

    console.log("Generated solution:", text, "  ", entry.detectedMood, "  ", entry.inputText);

    await prisma.moodEntry.update({
      where: { id: entryId },
      data: { solutions: JSON.stringify({ text }) },
    });

    res.json({ text });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to generate solution." });
  }
};

export const analyzeMood = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id;

  if (!text || text.trim().length < 10) {
    return res.status(400).json({ error: "Write at least 10 characters" });
  }

  try {
    const mood = await detectMood(text);
    const entry = await prisma.moodEntry.create({
      data: { userId, inputText: text, detectedMood: mood },
    });

    // YE LINE ZAROORI HAI — entryId bhejna
    res.json({ 
      mood, 
      entryId: entry.id,           // ← YE BHEJNA ZAROORI HAI
      inputText: text              // ← YE BHI (optional but good)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Service busy" });
  }
};

export const getMoodEntries = async (req, res) => {
  const userId = req.user.id;
  try {
    const entries = await prisma.moodEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ entries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch entries" });
  }
};

