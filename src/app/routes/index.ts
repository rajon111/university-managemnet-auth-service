import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AcademicSemesterRoutes } from '../modules/academicSemister/academicSemister.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = express.Router();

router.use('/users/', UserRoutes);
router.use('/academic-semesters/', AcademicSemesterRoutes);
router.use('/academic-faculties/', AcademicFacultyRoutes);

export default router;
