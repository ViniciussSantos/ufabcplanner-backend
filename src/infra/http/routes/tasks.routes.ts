import { Router } from 'express';
import { CreateTaskController } from 'modules/tasks/controllers/CreateTask.controller';
import { DeleteTaskController } from 'modules/tasks/controllers/DeleteTask.controller';
import { GetTasksBySubjectIdController } from 'modules/tasks/controllers/GetTasksBySubjectId.controller';
import { GetTasksByUserIdController } from 'modules/tasks/controllers/GetTasksByUserId.controller';
import { UpdateTaskController } from 'modules/tasks/controllers/UpdateTask.controller';
import { container } from 'tsyringe';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const tasksRoutes = Router();

/**
 * @swagger
 * /tasks/:
 *  post:
 *   tags:
 *   - Task
 *   summary: Create a task
 *   description: Create a task
 *   parameters:
 *   - name: title
 *     in: body
 *     required: true
 *     description: Task title
 *     schema:
 *      type: string
 *      example: "Task title"
 *   - name: description
 *     in: body
 *     required: true
 *     description: Task description
 *     schema:
 *      type: string
 *      example: "Task description"
 *   - name: subjectId
 *     in: body
 *     required: true
 *     description: Subject id
 *     schema:
 *      type: string
 *      example: "1"
 *   - name: dueDate
 *     in: body
 *     required: true
 *     description: Due date
 *     schema:
 *      type: string
 *      example: "2021-01-01"
 *      format: date
 *    */
tasksRoutes.post('/', ensureAuthenticated, (request, response) => {
  container.resolve(CreateTaskController).handle(request, response);
});

/**
 * @swagger
 * /tasks/delete/{id}:
 *  delete:
 *   tags:
 *   - Task
 *   summary: Delete a task
 *   description: Delete a task
 *   parameters:
 *   - name: id
 *     description: Task id
 *     in: path
 *     required: true
 *     schema:
 *      type: string
 *      example: "1"
 * */
tasksRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) => {
  container.resolve(DeleteTaskController).handle(request, response);
});

/**
 * @swagger
 * /tasks/get/subject/{id}:
 *  get:
 *   tags:
 *   - Task
 *   summary: Get tasks by subject id
 *   description: Get tasks by subject id
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Subject id
 *     schema:
 *     type: string
 *     example: "1"
 * */
tasksRoutes.get('/get/subject/:id', ensureAuthenticated, (request, response) => {
  container.resolve(GetTasksBySubjectIdController).handle(request, response);
});

/**
 * @swagger
 * /tasks/get/user:
 *  get:
 *   tags:
 *   - Task
 *   summary: Get tasks by user id
 *   description: Get tasks by user id
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: User id
 *     schema:
 *     type: string
 * */
tasksRoutes.get('/get/user', ensureAuthenticated, (request, response) => {
  container.resolve(GetTasksByUserIdController).handle(request, response);
});

/**
 * @swagger
 * /tasks/update/{id}:
 *  put:
 *   tags:
 *   - Task
 *   summary: Update a task
 *   description: Update a task
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Task id
 *     schema:
 *      type: string
 *      example: "1"
 *   - name: title
 *     in: body
 *     required: false
 *     description: Task title
 *     schema:
 *      type: string
 *      example: "Task title"
 *   - name: description
 *     in: body
 *     required: true
 *     description: Task description
 *     schema:
 *      type: string
 *      example: "Task description"
 *   - name: subjectId
 *     in: body
 *     required: false
 *     description: Subject id
 *     schema:
 *      type: string
 *      example: "1"
 *   - name: dueDate
 *     in: body
 *     required: true
 *     description: Due date
 *     schema:
 *      type: string
 *      example: "2021-01-01"
 *      format: date
 * */
tasksRoutes.put('/update/:id', ensureAuthenticated, (request, response) => {
  container.resolve(UpdateTaskController).handle(request, response);
});

export { tasksRoutes };
