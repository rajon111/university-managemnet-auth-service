import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from './../interfaces/error';
import mongoose from 'mongoose';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
