import express from 'express';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

const allowedOrigin = "https://moodgenius-app.vercel.app";

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

// Preflight handler
app.options('*', (req, res) => res.sendStatus(204));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api', contactRoutes);

export default app; // ✅ serverless safe
