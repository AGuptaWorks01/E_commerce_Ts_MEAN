import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY as string;

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ message: "Unauthorized: Token missing" })
            return
        }

        const decoded = jwt.verify(token, SECRET_KEY) as string
        (req as CustomRequest).token = decoded;
        next()
    } catch (err: any) {
        res.status(403).json({ message: 'Invalid token' })
    }
}

