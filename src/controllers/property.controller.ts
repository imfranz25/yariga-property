import { Request, Response } from 'express';
import errorType from '../errors/errorType.js';
import isError from '../helpers/isError.js';
// import propertyModel from '../models/property.js';
// import userModel from '../models/user.js';

const createProperty = (req: Request, res: Response) => {
  try {
    const { title, description, propertyType, location, price, photo } = req.body;
  } catch (error) {
    if (isError(error)) {
      errorType.SERVER_ERROR(error.message);
    }
    console.log(error);
  }
};

const updateProperty = (req: Request, res: Response) => {
  console.log('This is a createProperty endpoint');
};

const deleteProperty = (req: Request, res: Response) => {
  console.log('This is a createProperty endpoint');
};

const getAllProperties = (req: Request, res: Response) => {
  console.log('This is a getAllproperty endpoint');
};

const getPropertyDetails = (req: Request, res: Response) => {
  console.log('This is a getPropertyDetails endpoint');
};

export { createProperty, getAllProperties, getPropertyDetails, updateProperty, deleteProperty };
