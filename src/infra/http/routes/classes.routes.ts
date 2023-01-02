import { Router } from 'express';
import { CreateClassController } from 'modules/classes/controllers/CreateClass.controller';
import { DeleteClassController } from 'modules/classes/controllers/DeleteClass.controller';
import { GetClassesBySubjectIdController } from 'modules/classes/controllers/GetClassesBySubjectId.controller';
import { GetClassesByUserIdController } from 'modules/classes/controllers/GetClassesByUserId.controller';
import { UpdateClassController } from 'modules/classes/controllers/UpdateClass.controller';
import { container } from 'tsyringe';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const classRoutes = Router();

/**
 * @swagger
 * /classes/:
 *  post:
 *   tags:
 *   - Class
 *  summary: Create a class
 *  description: Create a class
 *  parameters:
 *  - name: subjectId
 *    in: body
 *    required: true
 *    description: Subject id
 *    schema:
 *     type: string
 *     example: "1"
 *  - name: professor
 *    in: body
 *    required: true
 *    description: Professor
 *    schema:
 *     type: string
 *     example: "Professor"
 *  - name: room
 *    in: body
 *    required: true
 *    description: Room
 *    schema:
 *     type: string
 *     example: "Room"
 *  - name: campus
 *    in: body
 *    required: true
 *    description: Campus
 *    schema:
 *     type: string
 *     example: "Campus"
 *  - name: building
 *    in: body
 *    required: true
 *    description: Building
 *    schema:
 *     type: string
 *     example: "Building"
 *  - name: startTime
 *    in: body
 *    required: true
 *    description: Start time
 *    schema:
 *     type: string
 *     example: "08:00"
 *  - name: endTime
 *    in: body
 *    required: true
 *    description: End time
 *    schema:
 *     type: string
 *     example: "10:00"
 *  - name: weekday
 *    in: body
 *    required: true
 *    description: Weekday
 *    schema:
 *      type: string
 *      example: "seg"
 *      enum:
 *      - "seg"
 *      - "ter"
 *      - "qua"
 *      - "qui"
 *      - "sex"
 *      - "sab"
 *      - "dom"
 * */
classRoutes.post('/', ensureAuthenticated, (request, response) => container.resolve(CreateClassController).handle(request, response));

/**
 * @swagger
 * /classes/delete/{id}:
 *  delete:
 *   tags:
 *   - Class
 *   summary: Delete a class
 *   description: Delete a class
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Class id
 *     schema:
 *      type: string
 *      example: "1"
 * */
classRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) =>
  container.resolve(DeleteClassController).handle(request, response),
);

/**
 * @swagger
 * /classes/get/subject/{id}:
 *  get:
 *   tags:
 *   - Class
 *   summary: Get classes by subject id
 *   description: Get classes by subject id
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Subject id
 *     schema:
 *      type: string
 *      example: "1"
 * */
classRoutes.get('/get/subject/:id', ensureAuthenticated, (request, response) =>
  container.resolve(GetClassesBySubjectIdController).handle(request, response),
);

/**
 * @swagger
 * /classes/get/user:
 *  get:
 *   tags:
 *   - Class
 *   summary: Get classes by user id
 *   description: Get classes by user id
 * */
classRoutes.get('/get/user', ensureAuthenticated, (request, response) =>
  container.resolve(GetClassesByUserIdController).handle(request, response),
);

/**
 * @swagger
 * /classes/update/{id}:
 *  put:
 *   tags:
 *   - Class
 *   summary: Update a class
 *   description: Update a class
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Class id
 *     schema:
 *      type: string
 *      example: "1"
 *   - name: professor
 *     in: body
 *     required: false
 *     description: Professor's name
 *     schema:
 *      type: string
 *      example: "Professor"
 *   - name: room
 *     in: body
 *     required: false
 *     description: Room
 *     schema:
 *      type: string
 *      example: "Room"
 *   - name: campus
 *     in: body
 *     required: false
 *     description: Campus
 *     schema:
 *      type: string
 *      example: "Campus"
 *   - name: building
 *     in: body
 *     required: false
 *     description: Building
 *     schema:
 *      type: string
 *      example: "Building"
 *   - name: startTime
 *     in: body
 *     required: false
 *     description: Start time
 *     schema:
 *      type: string
 *      example: "08:00"
 *   - name: endTime
 *     in: body
 *     required: false
 *     description: End time
 *     schema:
 *      type: string
 *      example: "10:00"
 *   - name: weekday
 *     in: body
 *     required: false
 *     description: Weekday
 *     schema:
 *      type: string
 *      example: "seg"
 *      enum:
 *      - "seg"
 *      - "ter"
 *      - "qua"
 *      - "qui"
 *      - "sex"
 *      - "sab"
 *      - "dom"
 * */
classRoutes.put('/update/:id', ensureAuthenticated, (request, response) =>
  container.resolve(UpdateClassController).handle(request, response),
);

export { classRoutes };
