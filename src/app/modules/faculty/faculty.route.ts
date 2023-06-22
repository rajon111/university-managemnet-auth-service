import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/', FacultyController.getAllFaculties);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch('/:id', FacultyController.updateFaculty);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
