import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AcademicSemisterTitleCodeMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemester } from './academicSemister.model';
import { IPagenationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (AcademicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemisters = async (
  pagenationOptions: IPagenationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePageination(pagenationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemisterService = {
  createSemister,
  getAllSemisters,
};
