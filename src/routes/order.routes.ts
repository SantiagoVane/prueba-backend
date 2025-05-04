/*
Rutas de la orden
 */
import { Router } from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/order.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isClient } from '../middlewares/role.middleware';

const router = Router();

router.post('/', verifyToken, isClient, createOrder);
router.get('/', verifyToken, getOrders);
router.get('/:id', verifyToken, getOrderById);

export default router;
