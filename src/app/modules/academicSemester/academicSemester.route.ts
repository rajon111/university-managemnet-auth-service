import express from 'express';
// import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AceademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemisterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AceademicSemesterValidation.createAcademicZodSchema),
  AcademicSemisterController.createSemister
);

router.get('/:id', AcademicSemisterController.getSingleSemester);
router.patch(
  '/:id',
  validateRequest(AceademicSemesterValidation.updateAcademicZodSchema),
  AcademicSemisterController.updateSemister
);
router.delete('/:id', AcademicSemisterController.deleteSemister);
router.get('/', AcademicSemisterController.getAllSemisters);

export const AcademicSemesterRoutes = router;
