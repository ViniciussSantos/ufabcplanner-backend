import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateSubjectController } from 'modules/subjects/controllers/CreateSubject.controller';
import { DeleteSubjectController } from 'modules/subjects/controllers/DeleteSubject.controller';
import { GetSubjectByQuarterIdController } from 'modules/subjects/controllers/GetSubjectByQuarterId.controller';
import { GetSubjectByUserIdController } from 'modules/subjects/controllers/GetSubjectByUserId.controller';
import { UpdateSubjectController } from 'modules/subjects/controllers/UpdateSubject.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const subjectsRoutes = Router();

subjectsRoutes.post('/', ensureAuthenticated, (request, response) => {
  container.resolve(CreateSubjectController).handle(request, response);
});
subjectsRoutes.get('/get/quarter/:id', ensureAuthenticated, (request, response) => {
  container.resolve(GetSubjectByQuarterIdController).handle(request, response);
});
subjectsRoutes.get('/get/user', ensureAuthenticated, (request, response) => {
  container.resolve(GetSubjectByUserIdController).handle(request, response);
});
subjectsRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) => {
  container.resolve(DeleteSubjectController).handle(request, response);
});
subjectsRoutes.put('/update/:id', ensureAuthenticated, (request, response) => {
  container.resolve(UpdateSubjectController).handle(request, response);
});

export { subjectsRoutes };
