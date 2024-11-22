import cors from 'cors';
import express, { Application } from 'express';
import { BiCycleStoreRoutes } from './modules/biCycleStore/biCycleStore.routes';
import { OrderRoutes } from './modules/order/order.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// Root route for the backend
app.get('/', (req, res) => {
    res.send('Welcome to the Bi-Cycle Store API!');
});

// routes for biCycleStore
app.use('/api/products', BiCycleStoreRoutes);

// routes for orders
app.use('/api/orders', OrderRoutes);

export default app;
