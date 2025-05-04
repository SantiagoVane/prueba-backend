/*
Autentificación del usuario, admin o cliente
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: 'admin' | 'client';
            };
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        req.user = {
            id: user._id.toString(),
            role: user.role
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
