/*
Modelo del producto
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
