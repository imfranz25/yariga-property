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

const SERVER_ERROR = (description: string) => {
  return new HttpError({
    status: 500,
    message: 'Server Error',
    code: 'user-004',
    description,
  });
};

export default { UNAUTHORIZED, FORBIDDEN, USER_NOT_FOUND, SERVER_ERROR };
