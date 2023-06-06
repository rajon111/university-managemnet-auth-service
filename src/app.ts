import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.router';
import { AcademicSemesterRoutes } from './app/modules/academicSemister/academicSemister.route';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);

// testing
// app.get('/', async(req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing not implemented')
// })

// global errors handler
app.use(globalErrorHandler);

export default app;
