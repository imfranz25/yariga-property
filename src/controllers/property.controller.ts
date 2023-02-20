import { Request, Response } from 'express';
// import propertyModel from '../models/property.js';
// import userModel from '../models/user.js';

const createProperty = (req: Request, res: Response) => {
  console.log('This is a createProperty endpoint');
};

const updateProperty = (req: Request, res: Response) => {
  console.log('This is a createProperty endpoint');
};

const deleteProperty = (req: Request, res: Response) => {
  console.log('This is a createProperty endpoint');
};

const getAllproperty = (req: Request, res: Response) => {
  console.log('This is a getAllproperty endpoint');
};

const getPropertyDetails = (req: Request, res: Response) => {
  console.log('This is a getPropertyDetails endpoint');
};

export { createProperty, getAllproperty, getPropertyDetails, updateProperty, deleteProperty };
