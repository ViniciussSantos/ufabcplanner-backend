/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from 'infra/http/errors/AppError';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from 'swagger.json';
import 'infra/container';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      name: err.name,
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
