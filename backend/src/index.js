import prisma from './prismaClient.js';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();

// Allowed frontend origin
const allowedOrigin = "https://moodgenius-app.vercel.app";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverless-safe CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Preflight OPTIONS handler
app.options('*', (req, res) => res.sendStatus(204));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api', contactRoutes);

// Test route
app.get('/', (req, res) => res.json({ message: "Mood Genius API Running!" }));

app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, users });
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app; // ✅ serverless-ready for Vercel
