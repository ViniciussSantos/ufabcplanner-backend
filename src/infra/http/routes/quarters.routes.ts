import { Router } from 'express';
import { CreateQuarterController } from 'modules/quarters/controllers/CreateQuarter.controller';
import { DeleteQuarterController } from 'modules/quarters/controllers/DeleteQuarter.controller';
import { GetQuarterByAcademicYearIdController } from 'modules/quarters/controllers/GetQuarterByAcademicYearId.controller';
import { UpdateQuarterController } from 'modules/quarters/controllers/UpdateQuarter.controller';
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
