import express from 'express';
import authRoutes from './authRoutes';

const router = express.Router();

// Route definitions
router.use('/auth', authRoutes);

export default router;