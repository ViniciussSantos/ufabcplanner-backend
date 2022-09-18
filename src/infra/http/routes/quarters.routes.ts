import { Router } from 'express';
import { CreateQuarterController } from 'modules/quarters/controllers/CreateQuarter.controller';
import { DeleteQuarterController } from 'modules/quarters/controllers/DeleteQuarter.controller';
import { GetQuarterByAcademicYearIdController } from 'modules/quarters/controllers/GetQuarterByAcademicYearId.controller';
import { UpdateQuarterController } from 'modules/quarters/controllers/UpdateQuarter.controller';
import { container } from 'tsyringe';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const quartersRoutes = Router();

quartersRoutes.post('/', ensureAuthenticated, (request, response) => {
  container.resolve(CreateQuarterController).handle(request, response);
});
quartersRoutes.get('/get/academicyear/:id', ensureAuthenticated, (request, response) => {
  container.resolve(GetQuarterByAcademicYearIdController).handle(request, response);
});
quartersRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) => {
  container.resolve(DeleteQuarterController).handle(request, response);
});
quartersRoutes.put('/update/:id', ensureAuthenticated, (request, response) => {
  container.resolve(UpdateQuarterController).handle(request, response);
});

export { quartersRoutes };
