/*
Modelo del producto
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    description: string;
    createdBy: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IProduct>('Product', productSchema);
