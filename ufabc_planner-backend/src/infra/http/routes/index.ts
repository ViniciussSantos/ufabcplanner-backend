import { Router } from 'express';
import { academicYearRoutes } from './academicYears.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/academicyears', academicYearRoutes);

export { router };
