/*
Modelo de la orden hecha por el cliente
 */

import mongoose, { Document, Schema } from 'mongoose';

interface IOrderItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items: IOrderItem[];
    createdAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', orderSchema);
