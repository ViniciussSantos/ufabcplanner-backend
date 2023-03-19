/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from 'infra/http/errors/AppError';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { InternalServerError } from './errors/InternalServerError';
import { HttpStatus } from './errors/HttpStatus';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UFABCPLANNER API',
      version: '1.0.0',
      description: 'Documentation for the UFABCPlanner API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/infra/http/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.code).json(err.toJson());
  }

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new InternalServerError(err).toJson());
});

export { app };
