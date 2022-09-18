import { Router } from 'express';
import { CreateExamController } from 'modules/exams/controllers/CreateExam.controller';
import { DeleteExamController } from 'modules/exams/controllers/DeleteExam.controller';
import { GetExamsBySubjectIdController } from 'modules/exams/controllers/GetExamsBySubjectId.controller';
import { GetExamsByUserIdController } from 'modules/exams/controllers/GetExamsByUserId.controller';
import { UpdateExamController } from 'modules/exams/controllers/UpdateExam.controller';
import { container } from 'tsyringe';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const examsRoutes = Router();

examsRoutes.post('/', ensureAuthenticated, (request, response) => container.resolve(CreateExamController).handle(request, response));
examsRoutes.delete('/delete/:id', ensureAuthenticated, (request, response) =>
  container.resolve(DeleteExamController).handle(request, response),
);
examsRoutes.get('/get/subject/:id', ensureAuthenticated, (request, response) =>
  container.resolve(GetExamsBySubjectIdController).handle(request, response),
);
examsRoutes.get('/get/user', ensureAuthenticated, (request, response) =>
  container.resolve(GetExamsByUserIdController).handle(request, response),
);
examsRoutes.put('/update/:id', ensureAuthenticated, (request, response) =>
  container.resolve(UpdateExamController).handle(request, response),
);

export { examsRoutes };
