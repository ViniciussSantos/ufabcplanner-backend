import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(3333, () => console.log('Server is up and running'));
