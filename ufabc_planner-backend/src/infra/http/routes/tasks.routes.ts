import { Router } from 'express';
import { CreateTaskController } from 'modules/tasks/controllers/CreateTaskController';
import { DeleteTaskController } from 'modules/tasks/controllers/DeleteTaskController';
import { GetTasksBySubjectIdController } from 'modules/tasks/controllers/GetTasksBySubjectIdController';
import { GetTasksByUserIdController } from 'modules/tasks/controllers/GetTasksByUserIdController';
import { UpdateTaskController } from 'modules/tasks/controllers/UpdateTaskController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const deleteTaskController = new DeleteTaskController();
const updateTaskController = new UpdateTaskController();
const getTasksBySubjectIdController = new GetTasksBySubjectIdController();
const getTasksByUserIdController = new GetTasksByUserIdController();

tasksRoutes.post('/', ensureAuthenticated, createTaskController.execute);
tasksRoutes.delete('/delete/:id', ensureAuthenticated, deleteTaskController.execute);
tasksRoutes.get('/get/subject/:id', ensureAuthenticated, getTasksBySubjectIdController.execute);
tasksRoutes.get('/get/user', ensureAuthenticated, getTasksByUserIdController.execute);
tasksRoutes.put('/update/:id', ensureAuthenticated, updateTaskController.execute);

export { tasksRoutes };
