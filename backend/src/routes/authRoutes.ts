import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    // Handle login logic here
    res.send({ message: 'Login successful' });
});

router.post('/register', (req, res) => {
    // Handle registration logic here
    res.send({ message: 'Registration successful' });
});

export default router;