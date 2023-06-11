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
    year: z.string({
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

const updateAcademicZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemisterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...academicSemisterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicSemisterMonths] as [string, ...string[]], {
          required_error: 'StartMonth is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemisterMonths] as [string, ...string[]], {
          required_error: 'EndMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const AceademicSemesterValidation = {
  createAcademicZodSchema,
  updateAcademicZodSchema,
};
