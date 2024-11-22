import cors from 'cors';
import express, { Application } from 'express';
import { BiCycleStoreRoutes } from './modules/biCycleStore/biCycleStore.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// routes for biCycleStore
app.use('/api/products', BiCycleStoreRoutes);




export default app;
