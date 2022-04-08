import { Router } from 'express';
import { ensureAuthenticated } from 'infra/middlewares/ensureAuthenticated';
import { CreateAcademyYearController } from 'modules/academicYears/controllers/CreateAcademyYearController';

const academicYearRoutes = Router();

const createAcademyYearController = new CreateAcademyYearController();

academicYearRoutes.post('/', ensureAuthenticated, createAcademyYearController.handle);

export { academicYearRoutes };
