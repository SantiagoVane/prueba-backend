import express from 'express';
import userRoutes from "./routes/user.routes";
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);

app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
