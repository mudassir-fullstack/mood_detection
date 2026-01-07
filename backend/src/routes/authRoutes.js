import express from 'express';
import { signup, login, forgetPassword, getAuthUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.get('/me', getAuthUser);
export default router;