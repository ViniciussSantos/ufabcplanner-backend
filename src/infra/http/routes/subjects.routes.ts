import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateSubjectController } from 'modules/subjects/controllers/CreateSubject.controller';
import { DeleteSubjectController } from 'modules/subjects/controllers/DeleteSubject.controller';
import { GetSubjectByQuarterIdController } from 'modules/subjects/controllers/GetSubjectByQuarterId.controller';
import { GetSubjectByUserIdController } from 'modules/subjects/controllers/GetSubjectByUserId.controller';
import { UpdateSubjectController } from 'modules/subjects/controllers/UpdateSubject.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const subjectsRoutes = Router();

/**
 * @swagger
 * /subjects/:
 *  post:
 *   tags:
 *   - Subject
 *   summary: Create a subject
 *   description: Create a subject
 *   parameters:
 *   - name: name
 *     in: body
 *     required: true
 *     description: Subject name
 *     schema:
 *      type: string
 *      example: "Subject"
 *   - name: description
 *     in: body
 *     required: false
 *     description: Subject description
 *     schema:
 *      type: string
 *      example: "Subject description"
 *   - name: quarterId
 *     in: body
 *     required: true
 *     description: Quarter id
 *     schema:
 *      type: string
 *      example: "1"
 * */
subjectsRoutes.post('/', ensureAuthenticated, (request, response) => {
  container.resolve(CreateSubjectController).handle(request, response);
});

/**
 * @swagger
 * /subjects/get/quarter/{id}:
 *  get:
 *   tags:
 *   - Subject
 *   summary: Get subjects by quarter id
 *   description: Get subjects by quarter id
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Quarter id
 *     schema:
 *      type: string
 *      example: "1"
 * */
subjectsRoutes.get('/get/quarter/:id', ensureAuthenticated, (request, response) => {
  container.resolve(GetSubjectByQuarterIdController).handle(request, response);
});
/**
 * @swagger
 * /subjects/get/user:
 *  get:
 *   tags:
 *   - Subject
 *   summary: Get subjects by user id
 *   description: Get subjects by user id
 *   parameters:
 *   - name: id
 *     in: bearer
 *     required: true
 *     description: user id
 *     schema:
 *      type: string
 *      example: "1"
 * */
subjectsRoutes.get('/get/user', ensureAuthenticated, (request, response) => {
  container.resolve(GetSubjectByUserIdController).handle(request, response);
});

/**
 * @swagger
 * /subjects/delete/{id}:
 *  delete:
 *   tags:
 *   - Subject
 *   summary: Delete a subject
 *   description: Delete a subject
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Subject id
 *     schema:
 *      type: string
 *      example: "1"
 * */
subjectsRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) => {
  container.resolve(DeleteSubjectController).handle(request, response);
});

/**
 * @swagger
 * /subjects/update/{id}:
 *  put:
 *   tags:
 *   - Subject
 *   summary: Update a subject
 *   description: Update a subject
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Subject id
 *     schema:
 *      type: string
 *      example: "1"
 *   - name: name
 *     in: body
 *     required: true
 *     description: Subject name
 *     schema:
 *      type: string
 *      example: "Subject"
 *   - name: description
 *     in: body
 *     required: false
 *     description: Subject description
 *     schema:
 *      type: string
 *      example: "Subject description"
 *   - name: quarterId
 *     in: body
 *     required: true
 *     description: Quarter id
 *     schema:
 *      type: string
 *      example: "1"
 * */
subjectsRoutes.put('/update/:id', ensureAuthenticated, (request, response) => {
  container.resolve(UpdateSubjectController).handle(request, response);
});

export { subjectsRoutes };
