// Manejo de la lógica de los usuarios

import { Request, Response } from 'express';

const users: string[] = [];

export const getUsers = (req: Request, res: Response) => {
    res.json(users);
};

export const addUser = (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nombre requerido' });

    users.push(name);
    res.status(201).json({ message: 'Usuario agregado', name });
};
