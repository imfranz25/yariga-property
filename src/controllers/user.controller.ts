import { Request, Response } from 'express';
import errorType from '../errors/errorType.js';
import isError from '../helpers/isError.js';
import User from '../models/user.js';

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, avatar } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(200).json(userExists);

    const newUser = await User.create({
      name,
      email,
      avatar,
    });

    res.status(201).json(newUser);
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

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userDetails = await User.findOne({ _id: id }).populate('allProperties');

    if (!userDetails) {
      return errorType.USER_NOT_FOUND('User not found');
    }

    res.status(200).json(userDetails);
  } catch (error) {
    if (isError(error)) {
      errorType.SERVER_ERROR(error.message as string);
    }

    console.log(error);
  }
};

export { createUser, getAllUsers, getUserById };
