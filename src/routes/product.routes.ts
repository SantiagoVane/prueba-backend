/*
Rutas del producto
 */

import { Router } from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';

const router = Router();

router.post('/', verifyToken, isAdmin, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
