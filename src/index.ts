import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

/* Helpers & Configs */
import serverConfig from './server.config.js';
import connectDB from './helpers/connectDB.js';

/* Initialization */
const app = express();

/* Configs */
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to Yariga' });
});

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB(serverConfig.MONGODB_URI);

    app.listen(serverConfig.PORT, () => {
      console.log('Server Running @ http://localhost:8080');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
