import { z } from 'zod';
// req validation
//body --> object
//data --> object
const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'role is required',
      }),
      password: z.string().optional(),
    }),
  }),
});
// request body validation
// await createUserZodSchema.parseAsync(req)

export const UserValidation = {
  createUserZodSchema,
};
