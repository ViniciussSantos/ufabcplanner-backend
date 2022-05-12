import { Router } from 'express';
import { ensureAuthenticated } from 'infra/http/middlewares/ensureAuthenticated';
import { CreateAcademicYearController } from 'modules/academicYears/controllers/CreateAcademicYearController';
import { DeleteAcademicYearController } from 'modules/academicYears/controllers/DeleteAcademicYearController';
import { GetAcademicYearByUserIdController } from 'modules/academicYears/controllers/GetAcademicYearByUserIdController';
import { UpdateAcademicYearController } from 'modules/academicYears/controllers/UpdateAcademicYearController';

const academicYearRoutes = Router();

const createAcademicYearController = new CreateAcademicYearController();
const deleteAcademicYearController = new DeleteAcademicYearController();
const updateAcademicYearController = new UpdateAcademicYearController();
const getAcademicYearByUserIdController = new GetAcademicYearByUserIdController();

academicYearRoutes.post('/', ensureAuthenticated, createAcademicYearController.handle);
academicYearRoutes.delete('/delete/:id', ensureAuthenticated, deleteAcademicYearController.handle);
academicYearRoutes.put('/update/:id', ensureAuthenticated, updateAcademicYearController.handle);
academicYearRoutes.get('/get/user', ensureAuthenticated, getAcademicYearByUserIdController.handle);

export { academicYearRoutes };
