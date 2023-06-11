import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  AcademicSemisterTitleCodeMapper,
  academicSemisterSeachableFields,
} from './academicSemister.constant';
import {
  IAcademicSemister,
  IAcademicSemisterFilters,
} from './academicSemister.interface';
import { AcademicSemester } from './academicSemister.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
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
  filters: IAcademicSemisterFilters,
  pagenationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { searchTerm, ...filtersdata } = filters;
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemisterSeachableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersdata).length) {
    andConditions.push({
      $and: Object.entries(filtersdata).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //filtersdata value gula object hiseb a ache tai Object.keys use kore arrey te covert kore nawa hoise
  // if(Object.keys(filtersdata).length > 0) {
  //   $and:[
  //     {
  //       title
  //     }
  //   ]
  // }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagenationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereCondition)
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

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemister = async (
  id: string,
  payload: Partial<IAcademicSemister>
): Promise<IAcademicSemister | null> => {
  if (
    payload.title &&
    payload.code &&
    AcademicSemisterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemisterService = {
  createSemister,
  getAllSemisters,
  getSingleSemester,
  updateSemister,
  deleteSemister,
};
