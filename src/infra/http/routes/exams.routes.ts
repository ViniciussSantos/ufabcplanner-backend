import { Router } from 'express';
import { CreateExamController } from 'modules/exams/controllers/CreateExam.controller';
import { DeleteExamController } from 'modules/exams/controllers/DeleteExam.controller';
import { GetExamsBySubjectIdController } from 'modules/exams/controllers/GetExamsBySubjectId.controller';
import { GetExamsByUserIdController } from 'modules/exams/controllers/GetExamsByUserId.controller';
import { UpdateExamController } from 'modules/exams/controllers/UpdateExam.controller';
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
