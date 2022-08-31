import { Router } from 'express';
import { CreateQuarterController } from 'modules/quarters/controllers/CreateQuarterController';
import { DeleteQuarterController } from 'modules/quarters/controllers/DeleteQuarterController';
import { GetQuarterByAcademicYearIdController } from 'modules/quarters/controllers/GetQuarterByAcademicYearIdController';
import { UpdateQuarterController } from 'modules/quarters/controllers/UpdateQuarterController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const quartersRoutes = Router();

const createQuarterController = new CreateQuarterController();
const deleteQuarterController = new DeleteQuarterController();
const updateQuarterController = new UpdateQuarterController();
const getQuarterByACademicYearIdController = new GetQuarterByAcademicYearIdController();

quartersRoutes.post('/', ensureAuthenticated, createQuarterController.handle);
quartersRoutes.get('/get/academicyear/:id', ensureAuthenticated, getQuarterByACademicYearIdController.handle);
quartersRoutes.delete('/delete/:id', ensureAuthenticated, deleteQuarterController.handle);
quartersRoutes.put('/update/:id', ensureAuthenticated, updateQuarterController.handle);

export { quartersRoutes };
