import { Router } from 'express';
import { CreateExamController } from 'modules/exams/controllers/CreateExam.controller';
import { DeleteExamController } from 'modules/exams/controllers/DeleteExam.controller';
import { GetExamsBySubjectIdController } from 'modules/exams/controllers/GetExamsBySubjectId.controller';
import { GetExamsByUserIdController } from 'modules/exams/controllers/GetExamsByUserId.controller';
import { UpdateExamController } from 'modules/exams/controllers/UpdateExam.controller';
import { container } from 'tsyringe';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const examsRoutes = Router();

/**
 * @swagger
 * /exams:
 *  post:
 *   tags:
 *    - Exam
 *   summary: Create an exam
 *   description: Create an exam
 *   parameters:
 *   - name: subjectId
 *     description: Subject id
 *     in: body
 *     required: true
 *     schema:
 *      type: string
 *      example: "1"
 *   - name: name
 *     description: Exam name
 *     in: body
 *     required: true
 *     schema:
 *      type: string
 *      example: "Exam name"
 *   - name: dueDate
 *     description: Due date
 *     in: body
 *     required: true
 *     schema:
 *      type: string
 *      example: "2021-01-01"
 *      format: date
 *   - name: time
 *     description: Time
 *     in: body
 *     required: true
 *     schema:
 *      type: string
 *      example: "08:00"
 *   - name: description
 *     description: Description
 *     in: body
 *     required: false
 *     schema:
 *      type: string
 *      example: "Description"
 *
 *
 */
examsRoutes.post('/', ensureAuthenticated, (request, response) => container.resolve(CreateExamController).handle(request, response));

/**
 * @swagger
 * /exams/delete/{id}:
 *  delete:
 *   tags:
 *    - Exam
 *   summary: Delete an exam
 *   description: Delete an exam
 *   parameters:
 *   - name: id
 *     description: Exam id
 *     in: path
 *     required: true
 *     schema:
 *      type: string
 *      example: "1"
 *
 * */
examsRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) =>
  container.resolve(DeleteExamController).handle(request, response),
);

/**
 * @swagger
 * /exams/get/subject/{id}:
 *  get:
 *   tags:
 *   - Exam
 *   summary: Get exams by subject id
 *   description: Get exams by subject id
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Subject id
 *     schema:
 *      type: string
 *      example: "1"
 * */
examsRoutes.get('/get/subject/:id', ensureAuthenticated, (request, response) =>
  container.resolve(GetExamsBySubjectIdController).handle(request, response),
);

/**
 * @swagger
 * /exams/get/user:
 *  get:
 *   tags:
 *   - Exam
 *   summary: Get exams by user id
 *   description: Get exams by user id
 *   parameters:
 *   - name: id
 *     in: bearer
 *     required: true
 *     description: User id
 * */
examsRoutes.get('/get/user', ensureAuthenticated, (request, response) =>
  container.resolve(GetExamsByUserIdController).handle(request, response),
);

/**
 * @swagger
 * /exams/update/{id}:
 *  put:
 *   tags:
 *   - Exam
 *   summary: Update an exam
 *   description: Update an exam
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Exam id
 *     schema:
 *      type: string
 *      example: "1"
 *   - name: subjectId
 *     description: Subject id
 *     in: body
 *     required: true
 *     schema:
 *      type: string
 *      example: "1"
 *   - name: name
 *     description: Exam name
 *     in: body
 *     required: false
 *     schema:
 *      type: string
 *      example: "Exam name"
 *   - name: dueDate
 *     description: Due date
 *     in: body
 *     required: true
 *     schema:
 *      type: string
 *      example: "2021-01-01"
 *      format: date
 *   - name: time
 *     description: Time
 *     in: body
 *     required: true
 *     schema:
 *      type: string
 *      example: "08:00"
 *   - name: description
 *     description: Description
 *     in: body
 *     required: false
 *     schema:
 *      type: string
 *      example: "Description"
 * */
examsRoutes.put('/update/:id', ensureAuthenticated, (request, response) =>
  container.resolve(UpdateExamController).handle(request, response),
);

export { examsRoutes };
