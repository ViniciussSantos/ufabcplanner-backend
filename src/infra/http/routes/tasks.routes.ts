import { Router } from 'express';
import { CreateTaskController } from 'modules/tasks/controllers/CreateTask.controller';
import { DeleteTaskController } from 'modules/tasks/controllers/DeleteTask.controller';
import { GetTasksBySubjectIdController } from 'modules/tasks/controllers/GetTasksBySubjectId.controller';
import { GetTasksByUserIdController } from 'modules/tasks/controllers/GetTasksByUserId.controller';
import { UpdateTaskController } from 'modules/tasks/controllers/UpdateTask.controller';
import { container } from 'tsyringe';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const tasksRoutes = Router();

tasksRoutes.post('/', ensureAuthenticated, (request, response) => {
  container.resolve(CreateTaskController).handle(request, response);
});
tasksRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) => {
  container.resolve(DeleteTaskController).handle(request, response);
});
tasksRoutes.get('/get/subject/:id', ensureAuthenticated, (request, response) => {
  container.resolve(GetTasksBySubjectIdController).handle(request, response);
});
tasksRoutes.get('/get/user', ensureAuthenticated, (request, response) => {
  container.resolve(GetTasksByUserIdController).handle(request, response);
});
tasksRoutes.put('/update/:id', ensureAuthenticated, (request, response) => {
  container.resolve(UpdateTaskController).handle(request, response);
});

export { tasksRoutes };
