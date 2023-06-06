import express from 'express';
// import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AceademicSemesterValidation } from './academicSemister.validation';
import { AcademicSemisterController } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AceademicSemesterValidation.createAcademicZodSchema),
  AcademicSemisterController.createSemister
);

export const AcademicSemesterRoutes = router;
