import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// Root route for the backend
app.get('/', (req, res) => {
    res.send('Welcome to the Bi-Cycle Store API!');
});


// application routes
app.use('/api', router);



export default app;
