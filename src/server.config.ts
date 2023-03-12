import * as dotenv from 'dotenv';
dotenv.config();

const serverConfig = {
  MONGODB_URI: process.env.MONGODB_URI || 'No database',
  PORT: process.env.PORT || 8080,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

/* Log configs */
console.log(serverConfig);

export default serverConfig;
