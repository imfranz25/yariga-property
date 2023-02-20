import { Request, Response } from 'express';
// import userModel from '../models/user.js';

const createUser = (req: Request, res: Response) => {
  console.log('This is a create user endpoint');
};

const getAllUsers = (req: Request, res: Response) => {
  console.log('This is a get all users endpoint');
};

const getUserById = (req: Request, res: Response) => {
  console.log('This is a getUserById endpoint');
};

export { createUser, getAllUsers, getUserById };
