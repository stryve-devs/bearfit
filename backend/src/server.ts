import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});