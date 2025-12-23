import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/settings';

// Verify and decode a JWT
export const verifyToken = (token: string): object | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Narrow the type explicitly
        if (typeof decoded === 'string') {
            return null; // If it's a string, treat it as invalid
        }

        return decoded; // If it's an object (JwtPayload), return it
    } catch (err) {
        return null; // Return null if token verification fails
    }
};