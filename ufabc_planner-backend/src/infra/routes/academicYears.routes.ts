import { Router } from 'express';
import { ensureAuthenticated } from 'infra/middlewares/ensureAuthenticated';
import { CreateAcademicYearController } from 'modules/academicYears/controllers/CreateAcademicYearController';
import { DeleteAcademicYearController } from 'modules/academicYears/controllers/DeleteAcademicYearController';
import { UpdateAcademicYearController } from 'modules/academicYears/controllers/UpdateAcademicYearController';

const academicYearRoutes = Router();

const createAcademicYearController = new CreateAcademicYearController();
const deleteAcademicYearController = new DeleteAcademicYearController();
const updateAcademicYearController = new UpdateAcademicYearController();

academicYearRoutes.post('/', ensureAuthenticated, createAcademicYearController.handle);
academicYearRoutes.delete('/delete/:id', ensureAuthenticated, deleteAcademicYearController.handle);
academicYearRoutes.put('/update/:id', ensureAuthenticated, updateAcademicYearController.handle);

export { academicYearRoutes };
