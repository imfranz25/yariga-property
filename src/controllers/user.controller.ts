import { Request, Response } from 'express';
import errorType from '../errors/errorType.js';
import isError from '../helpers/isError.js';
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
    if (isError(error)) {
      errorType.SERVER_ERROR(error.message as string);
    }

    console.log(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({}).limit(parseInt(req.query?._end as string) as number);

    res.status(200).json(allUsers);
  } catch (error) {
    if (isError(error)) {
      errorType.SERVER_ERROR(error.message as string);
    }

    console.log(error);
  }
};

const getUserById = (req: Request, res: Response) => {
  res.status(200).json({ message: 'This is a getUserById endpoint' });
};

export { createUser, getAllUsers, getUserById };
