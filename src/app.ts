import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { BiCycleStoreRoutes } from './modules/biCycleStore/biCycleStore.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/products', BiCycleStoreRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
