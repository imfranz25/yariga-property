import * as dotenv from 'dotenv';
dotenv.config();

const serverConfig = {
  MONGODB_URI: process.env.MONGODB_URI || 'No database',
  PORT: 8080,
};

/* Log configs */
console.log(serverConfig);

export default serverConfig;
