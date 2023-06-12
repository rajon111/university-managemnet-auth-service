import { Schema, model } from 'mongoose';
import {
  AcademicSemisterModel,
  IAcademicSemister,
} from './academicSemister.interface';
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemisterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semister is already exists!'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema
);
