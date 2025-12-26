// routes/index.ts
import { Router } from 'express';

const router = Router();

// Define your API endpoints here
router.get('/', (req, res) => res.json({ message: 'Welcome to the API!' }));
router.get('/health', (req, res) => res.json({ status: 'OK' }));

export default router;