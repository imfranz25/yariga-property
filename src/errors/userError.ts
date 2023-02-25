import HttpError from './httpError.js';

const UNAUTHORIZED = (description: string) => {
  return new HttpError({
    status: 401,
    message: 'Unauthorized',
    code: 'user-001',
    description,
  });
};

const FORBIDDEN = (description: string) => {
  return new HttpError({
    status: 403,
    message: 'Forbidden',
    code: 'user-002',
    description,
  });
};

const USER_NOT_FOUND = (description: string) => {
  return new HttpError({
    status: 404,
    message: 'User not found',
    code: 'user-003',
    description,
  });
};

module.exports = {
  UNAUTHORIZED,
  FORBIDDEN,
  USER_NOT_FOUND,
};
