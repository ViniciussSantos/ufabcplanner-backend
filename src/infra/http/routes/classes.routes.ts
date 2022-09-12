import { Router } from 'express';
import { CreateClassController } from 'modules/classes/controllers/CreateClass.controller';
import { DeleteClassController } from 'modules/classes/controllers/DeleteClass.controller';
import { GetClassesBySubjectIdController } from 'modules/classes/controllers/GetClassesBySubjectId.controller';
import { GetClassesByUserIdController } from 'modules/classes/controllers/GetClassesByUserId.controller';
import { UpdateClassController } from 'modules/classes/controllers/UpdateClass.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createClassController = new CreateClassController();
const deleteClassController = new DeleteClassController();
const getClassesBySubjectIdController = new GetClassesBySubjectIdController();
const getClassesByUserIdController = new GetClassesByUserIdController();
const updateClassController = new UpdateClassController();

const classRoutes = Router();

classRoutes.post('/', ensureAuthenticated, createClassController.execute);
classRoutes.delete('/delete/:id', ensureAuthenticated, deleteClassController.execute);
classRoutes.get('/get/subject/:id', ensureAuthenticated, getClassesBySubjectIdController.execute);
classRoutes.get('/get/user', ensureAuthenticated, getClassesByUserIdController.execute);
classRoutes.put('/update/:id', ensureAuthenticated, updateClassController.execute);

export { classRoutes };
