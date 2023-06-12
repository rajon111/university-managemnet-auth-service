import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validations';
const router = express.Router();

router.post(
  '/create-dept',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getAllDepartments);
router.get('/', AcademicDepartmentController.getAllDepartments);
router.get('/', AcademicDepartmentController.getAllDepartments);

export const academicDepartmentRoutes = router;
