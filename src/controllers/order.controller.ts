/*
Controlador de las ordenes hechas por el usuario
 */

import { Request, Response } from 'express';
import Order from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'La orden no contiene productos.' });
    }

    try {
        const newOrder = await Order.create({ user: userId, items });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden.', error });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const role = req.user?.role;

    try {
        const orders = role === 'admin'
            ? await Order.find().populate('user').populate('items.product')
            : await Order.find({ user: userId }).populate('items.product');

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las órdenes.', error });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const role = req.user?.role;
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('items.product');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada.' });
        }

        if (role !== 'admin' && order.user.toString() !== userId) {
            return res.status(403).json({ message: 'No tienes acceso a esta orden.' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la orden.', error });
    }
};

