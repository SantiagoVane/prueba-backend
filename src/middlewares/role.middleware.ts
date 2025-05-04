/*
Definición del rol de usuario -> administrador o cliente.
 */

import { Request, Response, NextFunction } from 'express';


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Solo administradores.' });
    }
    next();
};

export const isClient = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'client') {
        return res.status(403).json({ message: 'Acceso denegado. Solo clientes.' });
    }
    next();
};
