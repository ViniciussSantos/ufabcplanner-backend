import { Router } from 'express';
import { academicYearRoutes } from './academicYears.routes';
import { classRoutes } from './classes.routes';
import { quartersRoutes } from './quarters.routes';
import { subjectsRoutes } from './subjects.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/academicyears', academicYearRoutes);
router.use('/quarters', quartersRoutes);
router.use('/subjects', subjectsRoutes);
router.use('/classes', classRoutes);

export { router };
