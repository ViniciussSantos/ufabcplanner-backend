import { Router } from 'express';
import { ensureAuthenticated } from 'infra/http/middlewares/ensureAuthenticated';
import { CreateAcademicYearController } from 'modules/academicYears/controllers/CreateAcademicYear.controller';
import { DeleteAcademicYearController } from 'modules/academicYears/controllers/DeleteAcademicYear.controller';
import { GetAcademicYearByUserIdController } from 'modules/academicYears/controllers/GetAcademicYearByUserId.controller';
import { UpdateAcademicYearController } from 'modules/academicYears/controllers/UpdateAcademicYear.controller';
import { container } from 'tsyringe';

const academicYearRoutes = Router();

academicYearRoutes.post('/', ensureAuthenticated, (request, response) =>
  container.resolve(CreateAcademicYearController).handle(request, response),
);
academicYearRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) =>
  container.resolve(DeleteAcademicYearController).handle(request, response),
);

academicYearRoutes.put('/update/:id', ensureAuthenticated, (request, response) =>
  container.resolve(UpdateAcademicYearController).handle(request, response),
);
academicYearRoutes.get('/get/user', ensureAuthenticated, (request, response) =>
  container.resolve(GetAcademicYearByUserIdController).handle(request, response),
);

export { academicYearRoutes };
