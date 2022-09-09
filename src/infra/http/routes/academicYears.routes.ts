import { Router } from 'express';
import { ensureAuthenticated } from 'infra/http/middlewares/ensureAuthenticated';
import { CreateAcademicYearController } from 'modules/academicYears/controllers/CreateAcademicYear.controller';
import { DeleteAcademicYearController } from 'modules/academicYears/controllers/DeleteAcademicYear.controller';
import { GetAcademicYearByUserIdController } from 'modules/academicYears/controllers/GetAcademicYearByUserId.controller';
import { UpdateAcademicYearController } from 'modules/academicYears/controllers/UpdateAcademicYear.controller';

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
