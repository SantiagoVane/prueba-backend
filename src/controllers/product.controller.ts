/*
Creación del controlador pra los productos, con los correspondientes permisos de admin para el CRUD
 */

import { Request, Response } from 'express';
import Product from '../models/product';

//Creación
export const createProduct = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        const { title, description } = req.body;

        const product = new Product({
            title,
            description,
            createdBy: req.user.id
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

export const getAllProducts = async (_: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};

//Cambio
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

//Eliminación
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};


