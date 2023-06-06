import { z } from 'zod';
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant';

const createAcademicZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemisterCodes] as [string, ...string[]]),
    startMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'StartMonth is required',
    }),
    endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'EndMonth is required',
    }),
  }),
});

export const AceademicSemesterValidation = {
  createAcademicZodSchema,
};
