import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AcademicSemisterTitleCodeMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemester } from './academicSemister.model';

const createSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (AcademicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemisterService = {
  createSemister,
};
