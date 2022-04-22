import { Router } from 'express';
import { academicYearRoutes } from './academicYears.routes';
import { quartersRoutes } from './quarters.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/academicyears', academicYearRoutes);
router.use('/quarters', quartersRoutes);

export { router };
