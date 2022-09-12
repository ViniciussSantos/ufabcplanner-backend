import { Router } from 'express';
import { CreateTaskController } from 'modules/tasks/controllers/CreateTask.controller';
import { DeleteTaskController } from 'modules/tasks/controllers/DeleteTask.controller';
import { GetTasksBySubjectIdController } from 'modules/tasks/controllers/GetTasksBySubjectId.controller';
import { GetTasksByUserIdController } from 'modules/tasks/controllers/GetTasksByUserId.controller';
import { UpdateTaskController } from 'modules/tasks/controllers/UpdateTask.controller';
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
