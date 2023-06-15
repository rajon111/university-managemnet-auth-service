import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { Student } from './student.model';
import { IStudent, IStudentFilters } from './student.interface';
import { IGenericResponse } from '../../../interfaces/common';
import { studentSeachableFields } from './student.constant';

const getAllStudents = async (
  filters: IStudentFilters,
  pagenationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersdata } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSeachableFields.map(field => ({
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

  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
