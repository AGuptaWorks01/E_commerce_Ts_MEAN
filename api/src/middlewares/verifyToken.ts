import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY as string;

interface JwtPayloadWithUser extends JwtPayload {
    id: number;
    email: string;
    role: string;
}

export interface CustomRequest extends Request {
    user: JwtPayloadWithUser;
}


export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: "Unauthorized: Token missing" })
            return
        }

        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayloadWithUser;

        (req as CustomRequest).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' })
    }
}

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as CustomRequest).user;
        console.log("User role:", user.role);

        if (!user) res.status(401).json({ message: 'Unauthorized' })

        if (!allowedRoles.includes(user.role)) {
            res.status(403).json({ message: "Access denied: Insufficient role" })
            return
        }
        next();
    }
}

