import { httpErrorProps } from '../interfaces/error.interface.js';

class HttpError {
  status;
  message;
  code;
  description;

  constructor({ status, message, code, description }: httpErrorProps) {
    this.status = status;
    this.message = message;
    this.code = code;
    this.description = description;
  }
}

export default HttpError;
