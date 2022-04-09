import { Router } from 'express';
import { ensureAuthenticated } from 'infra/middlewares/ensureAuthenticated';
import { CreateAcademyYearController } from 'modules/academicYears/controllers/CreateAcademyYearController';
import { DeleteAcademicYearController } from 'modules/academicYears/controllers/DeleteAcademicYearController';

const academicYearRoutes = Router();

const createAcademyYearController = new CreateAcademyYearController();
const deleteAcademyYearController = new DeleteAcademicYearController();

academicYearRoutes.post('/', ensureAuthenticated, createAcademyYearController.handle);
academicYearRoutes.delete('delete/:id', ensureAuthenticated, deleteAcademyYearController.handle);

export { academicYearRoutes };
