import { Router } from 'express';
import { CreateSubjectController } from 'modules/subjects/controllers/CreateSubject.controller';
import { DeleteSubjectController } from 'modules/subjects/controllers/DeleteSubject.controller';
import { GetSubjectByQuarterIdController } from 'modules/subjects/controllers/GetSubjectByQuarterId.controller';
import { GetSubjectByUserIdController } from 'modules/subjects/controllers/GetSubjectByUserId.controller';
import { UpdateSubjectController } from 'modules/subjects/controllers/UpdateSubject.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const subjectsRoutes = Router();

const createSubjectController = new CreateSubjectController();
const deleteSubjectController = new DeleteSubjectController();
const updateSubjectController = new UpdateSubjectController();
const getSubjectByQuarterIdController = new GetSubjectByQuarterIdController();
const getSubjectByUserIdController = new GetSubjectByUserIdController();

subjectsRoutes.post('/', ensureAuthenticated, createSubjectController.handle);
subjectsRoutes.get('/get/quarter/:id', ensureAuthenticated, getSubjectByQuarterIdController.handle);
subjectsRoutes.get('/get/user', ensureAuthenticated, getSubjectByUserIdController.handle);
subjectsRoutes.delete('/delete/:id', ensureAuthenticated, deleteSubjectController.handle);
subjectsRoutes.put('/update/:id', ensureAuthenticated, updateSubjectController.handle);

export { subjectsRoutes };
