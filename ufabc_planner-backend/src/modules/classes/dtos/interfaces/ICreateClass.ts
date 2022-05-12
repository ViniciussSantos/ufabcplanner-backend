import { BiweeklyType, Weekdays } from '@prisma/client';

export interface ICreateClass {
  professor?: string;
  room?: string;
  campus?: string;
  building?: string;
  startTime: string;
  endTime: string;
  weekday: Weekdays;
  biweeklyType?: BiweeklyType;
  subjectId: string;
  userId: string;
}
