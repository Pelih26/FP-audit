import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL as string,
  username: process.env.USERNAME as string,
  password: process.env.PASSWORD as string,
};