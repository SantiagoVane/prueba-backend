import express from 'express';
import userRoutes from "./routes/user.routes";
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

//const PORT = process.env.PORT || 3000;

console.log('URI:', process.env.MONGO_URI);


app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);

app.use('/orders', orderRoutes);

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('La URI de MongoDB no está definida en .env');
  process.exit(1); // Detener el proceso si no se encuentra la URI
}

mongoose.connect(uri)
    .then(() => {
      console.log('Conexión a MongoDB exitosa');
    })
    .catch((err) => {
      console.error('Error al conectar a MongoDB:', err);
    });

app.use('/auth', authRoutes);

console.log('🔌 Rutas montadas');


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


