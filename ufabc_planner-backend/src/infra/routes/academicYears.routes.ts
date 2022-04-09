import { Router } from 'express';
import { ensureAuthenticated } from 'infra/middlewares/ensureAuthenticated';
import { CreateAcademicYearController } from 'modules/academicYears/controllers/CreateAcademicYearController';
import { DeleteAcademicYearController } from 'modules/academicYears/controllers/DeleteAcademicYearController';

const academicYearRoutes = Router();

const createAcademicYearController = new CreateAcademicYearController();
const deleteAcademicYearController = new DeleteAcademicYearController();

academicYearRoutes.post('/', ensureAuthenticated, createAcademicYearController.handle);
academicYearRoutes.delete('/delete/:id', ensureAuthenticated, deleteAcademicYearController.handle);

export { academicYearRoutes };
