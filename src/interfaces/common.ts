import { ReactNode } from 'react';
import { FormEventHandler } from 'react';
import { CreateResponse, UpdateResponse, BaseRecord } from '@pankod/refine-core/dist/interfaces';
import { FieldValues, UseFormHandleSubmit } from '@pankod/refine-react-hook-form';

export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface PropertyProps {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  photo: string;
  creator: string;
}

export interface ProfileProps {
  type: string;
  name: string;
  avatar: string;
  email: string;
  properties: Array<PropertyProps> | undefined;
}

export interface FormProps {
  type: string;
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleImageChange: (file: File) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  propertyImage: { name: string; url: string };
}
