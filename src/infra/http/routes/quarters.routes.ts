import { Router } from 'express';
import { CreateQuarterController } from 'modules/quarters/controllers/CreateQuarter.controller';
import { DeleteQuarterController } from 'modules/quarters/controllers/DeleteQuarter.controller';
import { GetQuarterByAcademicYearIdController } from 'modules/quarters/controllers/GetQuarterByAcademicYearId.controller';
import { UpdateQuarterController } from 'modules/quarters/controllers/UpdateQuarter.controller';
import { container } from 'tsyringe';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const quartersRoutes = Router();

/**
 * @swagger
 * /quarters/:
 *  post:
 *   tags:
 *   - Quarter
 *   summary: Create a quarter
 *   description: Create a quarter
 *   parameters:
 *    - name: academicYearId
 *      in: body
 *      required: true
 *      description: Academic year id
 *      schema:
 *        type: string
 *        example: "b47be6d8-24ae-4976-826d-0f9339d3eb21"
 *    - name: startDate
 *      in: body
 *      required: true
 *      description: Start date
 *      schema:
 *       type: string
 *       example: "2021-01-01"
 *    - name: endDate
 *      in: body
 *      required: true
 *      description: End date
 *      schema:
 *        type: string
 *        example: "2021-01-02"
 *  responses:
 *   201:
 *    description: Success
 * */
quartersRoutes.post('/', ensureAuthenticated, (request, response) => {
  container.resolve(CreateQuarterController).handle(request, response);
});

/**
 * @swagger
 * /quarters/get/academicyear/{id}:
 *  get:
 *   tags:
 *   - Quarter
 *   summary: Get all quarters by academic year id
 *   description: Get all quarters by academic year id
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Academic year id
 *     schema:
 *      type: string
 *      example: "b47be6d8-24ae-4976-826d-0f9339d3eb21"
 *   responses:
 *    200:
 *      description: Success
 */
quartersRoutes.get('/get/academicyear/:id', ensureAuthenticated, (request, response) => {
  container.resolve(GetQuarterByAcademicYearIdController).handle(request, response);
});

/**
 * @swagger
 * /quarters/delete/{id}:
 *  delete:
 *   tags:
 *   - Quarter
 *   summary: Delete a quarter
 *   description: Delete a quarter
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Quarter id
 *     schema:
 *      type: string
 *      example: "b47be6d8-24ae-4976-826d-0f9339d3eb21"
 *   responses:
 *    204:
 *      description: Success
 * */
quartersRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) => {
  container.resolve(DeleteQuarterController).handle(request, response);
});

/**
 * @swagger
 * /quarters/update/{id}:
 *  put:
 *   tags:
 *   - Quarter
 *   summary: Update a quarter
 *   description: Update a quarter
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     description: Quarter id
 *     schema:
 *      type: string
 *      example: "b47be6d8-24ae-4976-826d-0f9339d3eb21"
 *   - name: startDate
 *     in: body
 *     required: true
 *     description: start date
 *     schema:
 *      type: string
 *      example: "2021-01-01"
 *   - name: endDate
 *     in: body
 *     required: true
 *     description: end date
 *     schema:
 *      type: string
 *      example: "2021-01-02"
 * */
quartersRoutes.put('/update/:id', ensureAuthenticated, (request, response) => {
  container.resolve(UpdateQuarterController).handle(request, response);
});

export { quartersRoutes };
