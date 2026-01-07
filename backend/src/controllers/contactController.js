import nodemailer from "nodemailer";
import prisma from '../prismaClient.js';

export const createContact = async (req, res) => {
  try {
    const { full_name, email, subject, message } = req.body;

    const newContact = await prisma.contact.create({
      data: { full_name, email, subject, message },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,    
        pass: process.env.MAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `New Contact Message: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Message received and email sent!",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact POST Error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
