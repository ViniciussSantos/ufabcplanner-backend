import { Router } from 'express';
import { CreateClassController } from 'modules/classes/controllers/CreateClass.controller';
import { DeleteClassController } from 'modules/classes/controllers/DeleteClass.controller';
import { GetClassesBySubjectIdController } from 'modules/classes/controllers/GetClassesBySubjectId.controller';
import { GetClassesByUserIdController } from 'modules/classes/controllers/GetClassesByUserId.controller';
import { UpdateClassController } from 'modules/classes/controllers/UpdateClass.controller';
import { container } from 'tsyringe';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const classRoutes = Router();

classRoutes.post('/', ensureAuthenticated, (request, response) => container.resolve(CreateClassController).handle(request, response));
classRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) =>
  container.resolve(DeleteClassController).handle(request, response),
);
classRoutes.get('/get/subject/:id', ensureAuthenticated, (request, response) =>
  container.resolve(GetClassesBySubjectIdController).handle(request, response),
);
classRoutes.get('/get/user', ensureAuthenticated, (request, response) =>
  container.resolve(GetClassesByUserIdController).handle(request, response),
);
classRoutes.put('/update/:id', ensureAuthenticated, (request, response) =>
  container.resolve(UpdateClassController).handle(request, response),
);

export { classRoutes };
