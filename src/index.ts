const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

/* Initialization */
const app = express();

/* Configs */
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req: Request, res: Response, next: Function) => {
  res.send({ message: 'Welcome to Yariga' });
});
