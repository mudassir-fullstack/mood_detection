import prisma from './prismaClient.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
dotenv.config();
const app = express();

app.use(cors({
  origin: "https://moodgenius-app.vercel.app",
  credentials: true,
}));
app.options("*", cors({
  origin: "https://moodgenius-app.vercel.app",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api', contactRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Mood Genius API Running!" });
});

app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, users });
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

export default app;

