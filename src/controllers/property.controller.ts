import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Property from '../models/property.js';
import errorType from '../errors/errorType.js';
import isError from '../helpers/isError.js';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { propertyQuery, OneOrNegativeOne, AscOrDesc } from '../interfaces/property.interface.js';
import serverConfig from '../server.config.js';

/* Initialization */
dotenv.config();
cloudinary.config({
  cloud_name: serverConfig.CLOUDINARY_CLOUD_NAME,
  api_key: serverConfig.CLOUDINARY_API_KEY,
  api_secret: serverConfig.CLOUDINARY_API_SECRET,
});

const createProperty = async (req: Request, res: Response) => {
  try {
    const { title, description, propertyType, location, price, photo, email } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await User.findOne({ email }).session(session);

    if (!user) {
      return errorType.USER_NOT_FOUND('Email is not registered');
    }

    const photoUrl = await cloudinary.uploader.upload(photo);
    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });
    await session.commitTransaction();

    res.status(201).json({ message: 'Property Created Successfully' });
  } catch (error) {
    console.log(error);

    if (isError(error)) {
      errorType.SERVER_ERROR(error.message);
    }
  }
};

const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, propertyType, location, price, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    await Property.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        propertyType,
        location,
        price,
        photo: photoUrl.url || photo,
      }
    );

    res.status(200).json({ message: 'Property updated successfully' });
  } catch (error) {
    console.log(error);

    if (isError(error)) {
      errorType.SERVER_ERROR(error.message);
    }
  }
};

const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const propertyToDelete = await Property.findById(id).populate('creator');

    if (!propertyToDelete) {
      return errorType.PROPERTY_NOT_FOUND(`Property doesn't exist`);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    propertyToDelete.remove({ session });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    propertyToDelete.creator?.allProperties.pull(propertyToDelete);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await propertyToDelete.creator?.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: 'Property Deleted Successfully' });
  } catch (error) {
    console.log(error);

    if (isError(error)) {
      errorType.SERVER_ERROR(error.message);
    }
  }
};

const getAllProperties = async (req: Request, res: Response) => {
  try {
    const query: propertyQuery = {};
    const { _end, _order, _start, _sort, title_like = '', propertyType = '' } = req.query;

    if (propertyType) {
      query.propertyType = propertyType as string;
    }

    if (title_like) {
      query.title = { $regex: title_like, $options: 'i' };
    }

    const propertyCount = await Property.countDocuments({ query });
    const properties: object = await Property.find(query)
      .limit(parseInt(_end as string))
      .skip(parseInt(_start as string))
      .sort({ [_sort as string]: _order as OneOrNegativeOne | AscOrDesc });

    res.header('x-total-count', propertyCount.toString());
    res.header('Access-Control-Expose-Headers', 'x-total-count');

    res.status(200).json(properties);
  } catch (error) {
    console.log(error);

    if (isError(error)) {
      errorType.SERVER_ERROR(error.message);
    }
  }
};

const getPropertyDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isPropertyExist = await Property.findOne({ _id: id }).populate('creator');

    if (!isPropertyExist) {
      return errorType.PROPERTY_NOT_FOUND(`Property doesn't exist`);
    }

    res.status(200).json(isPropertyExist);
  } catch (error) {
    console.log(error);

    if (isError(error)) {
      errorType.SERVER_ERROR(error.message);
    }
  }
};

export { createProperty, getAllProperties, getPropertyDetails, updateProperty, deleteProperty };
