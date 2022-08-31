import { BiweeklyType, Weekdays } from '@prisma/client';

export interface IUpdateClass {
  id: string;
  professor?: string;
  room?: string;
  campus?: string;
  building?: string;
  startTime: string;
  endTime: string;
  weekday?: Weekdays;
  biweeklyType?: BiweeklyType;
}
