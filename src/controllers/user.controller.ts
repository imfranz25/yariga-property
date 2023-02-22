import { Request, Response } from 'express';
import User from '../models/user.js';

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, avatar } = req.body;
    const userData = await User.findOne({ email });

    if (userData) {
      return res.status(200).json({ message: 'User Login Success', ...userData });
    } else {
      const newUser = await User.create({ name, email, avatar });

      return res.status(201).json({ newUser, message: 'User Created' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({ message: 'This is a get all users endpoint' });
};

const getUserById = (req: Request, res: Response) => {
  res.status(200).json({ message: 'This is a getUserById endpoint' });
};

export { createUser, getAllUsers, getUserById };