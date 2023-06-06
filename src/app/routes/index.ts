import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AcademicSemesterRoutes } from '../modules/academicSemister/academicSemister.route';
const router = express.Router();

router.use('/users/', UserRoutes);
router.use('/academic-semesters/', AcademicSemesterRoutes);

export default router;
