import { Router } from 'express';
import { ensureAuthenticated } from 'infra/http/middlewares/ensureAuthenticated';
import { CreateAcademicYearController } from 'modules/academicYears/controllers/CreateAcademicYear.controller';
import { DeleteAcademicYearController } from 'modules/academicYears/controllers/DeleteAcademicYear.controller';
import { GetAcademicYearByUserIdController } from 'modules/academicYears/controllers/GetAcademicYearByUserId.controller';
import { UpdateAcademicYearController } from 'modules/academicYears/controllers/UpdateAcademicYear.controller';
import { container } from 'tsyringe';

const academicYearRoutes = Router();

/**
 * @swagger
 * /academicyears/:
 *  post:
 *   tags:
 *   - AcademicYear
 *   summary: Create an academic year
 *   description: Create an academic year
 *   parameters:
 *   - name: year
 *     in: body
 *     required: true
 *     description: Year
 *     schema:
 *      type: string
 *      example: "2021"
 *   - name: startDate
 *     in: body
 *     required: true
 *     description: Start date
 *     schema:
 *      type: string
 *      example: "2021-01-01"
 *   - name: endDate
 *     in: body
 *     required: true
 *     description: End date
 *     schema:
 *      type: string
 *      example: "2021-01-02"
 * responses:
 *  201:
 *   description: Success
 *
 *
 * */
academicYearRoutes.post('/', ensureAuthenticated, (request, response) =>
  container.resolve(CreateAcademicYearController).handle(request, response),
);

/**
 * @swagger
 * /academicyears/delete/{id}:
 *  delete:
 *   tags:
 *   - AcademicYear
 *   summary: Delete an academic year
 *   description: Delete an academic year
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Academic year id
 *     schema:
 *      type: string
 *      example: "b47be6d8-24ae-4976-826d-0f9339d3eb21"
 *  responses:
 *   204:
 *    description: Success
 * */
academicYearRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) =>
  container.resolve(DeleteAcademicYearController).handle(request, response),
);

/**
 * @swagger
 * /academicyears/update/{id}:
 *  put:
 *   tags:
 *   - AcademicYear
 *   summary: Update an academic year
 *   description: Update an academic year
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Academic year id
 *     schema:
 *      type: string
 *      example: "b47be6d8-24ae-4976-826d-0f9339d3eb21"
 *   - name: year
 *     in: body
 *     required: false
 *     description: Year
 *     schema:
 *      type: string
 *      example: "2021"
 *   - name: startDate
 *     in: body
 *     required: true
 *     description: Start date
 *     schema:
 *      type: string
 *      example: "2021-01-01"
 *   - name: endDate
 *     in: body
 *     required: true
 *     description: End date
 *     schema:
 *      type: string
 *      example: "2021-01-02"
 *  responses:
 *   204:
 *    description: Success
 * */

academicYearRoutes.put('/update/:id', ensureAuthenticated, (request, response) =>
  container.resolve(UpdateAcademicYearController).handle(request, response),
);

/**
 * @swagger
 * /academicyears/get/user:
 *  get:
 *   tags:
 *   - AcademicYear
 *   summary: Get academic year by user id
 *   description: Get academic year by user id
 *  responses:
 *   200:
 *    description: Success
 *    schema:
 *     type: object
 *     properties:
 *      id:
 *       type: string
 *       example: "b47be6d8-24ae-4976-826d-0f9339d3eb21"
 *      year:
 *       type: string
 *       example: "2021"
 *      startDate:
 *       type: string
 *       example: "2021-01-01"
 *      endDate:
 *       type: string
 *       example: "2021-01-02"
 * */
academicYearRoutes.get('/get/user', ensureAuthenticated, (request, response) =>
  container.resolve(GetAcademicYearByUserIdController).handle(request, response),
);

export { academicYearRoutes };
