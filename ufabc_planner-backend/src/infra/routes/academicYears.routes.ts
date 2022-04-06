import { Router } from 'express';
import { CreateAcademyYearController } from 'modules/academicYears/controllers/CreateAcademyYearController';

const academicYearRoutes = Router();

const createAcademyYearController = new CreateAcademyYearController();

academicYearRoutes.post('/', createAcademyYearController.handle);

export { academicYearRoutes };
