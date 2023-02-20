import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

/* Initialization */
const app = express();

/* Configs */
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to Yariga' });
});

const startServer = () => {
  try {
    // Connect to Database
  } catch (error) {
    console.log(error);
  }
};
