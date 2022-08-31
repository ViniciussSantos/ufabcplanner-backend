import { Router } from 'express';
import { CreateExamController } from 'modules/exams/controllers/CreateExamController';
import { DeleteExamController } from 'modules/exams/controllers/DeleteExamController';
import { GetExamsBySubjectIdController } from 'modules/exams/controllers/GetExamsBySubjectIdController';
import { GetExamsByUserIdController } from 'modules/exams/controllers/GetExamsByUserIdController';
import { UpdateExamController } from 'modules/exams/controllers/UpdateExamController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createExamController = new CreateExamController();
const deleteExamController = new DeleteExamController();
const updateExamController = new UpdateExamController();
const getExamsBySubjectIdController = new GetExamsBySubjectIdController();
const getExamsByUserIdController = new GetExamsByUserIdController();

const examsRoutes = Router();

examsRoutes.post('/', ensureAuthenticated, createExamController.execute);
examsRoutes.delete('/delete/:id', ensureAuthenticated, deleteExamController.execute);
examsRoutes.get('/get/subject/:id', ensureAuthenticated, getExamsBySubjectIdController.execute);
examsRoutes.get('/get/user', ensureAuthenticated, getExamsByUserIdController.execute);
examsRoutes.put('/update/:id', ensureAuthenticated, updateExamController.execute);

export { examsRoutes };
