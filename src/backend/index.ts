import express, { Request, Response } from 'express';
import dotenv from 'dotenv';


dotenv.config();


const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;


app.get('/', (req: Request, res: Response) => {
res.json({ message: 'Hello from Node 22 + TypeScript!' });
});


app.get('/health', (req: Request, res: Response) => {
res.send('ok');
});


app.listen(PORT, () => {
// eslint-disable-next-line no-console
console.log(`Server listening on port ${PORT}`);
});