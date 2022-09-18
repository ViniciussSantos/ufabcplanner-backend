import { Router } from 'express';
import { AuthenticateUserController } from 'modules/accounts/controllers/AuthenticateUser.controller';
import { CreateUserController } from 'modules/accounts/controllers/CreateUser.controller';
import { container } from 'tsyringe';

const usersRoutes = Router();

usersRoutes.post('/', (request, response) => container.resolve(CreateUserController).handle(request, response));
usersRoutes.post('/login', (request, response) => container.resolve(AuthenticateUserController).handle(request, response));

export { usersRoutes };
