import { Router } from 'express';
import { AuthenticateUserController } from 'modules/users/controllers/AuthenticateUserController';
import { CreateUserController } from 'modules/users/controllers/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/login', authenticateUserController.handle);

export { usersRoutes };
