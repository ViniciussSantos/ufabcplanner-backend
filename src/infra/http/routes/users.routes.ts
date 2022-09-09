import { Router } from 'express';
import { AuthenticateUserController } from 'modules/accounts/controllers/AuthenticateUser.controller';
import { CreateUserController } from 'modules/accounts/controllers/CreateUser.controller';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/login', authenticateUserController.handle);

export { usersRoutes };
