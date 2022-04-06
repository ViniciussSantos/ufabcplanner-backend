import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'tsyringe';

dayjs.extend(utc);

@injectable()
export class DateProvider {
  toDate(date: string): Date {
    return dayjs(date).toDate();
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().format();
  }

  compareInDays(startDate: Date, endDate: Date): Number {
    const startDateUtc = this.convertToUTC(startDate);
    const endDateUtc = this.convertToUTC(endDate);

    return dayjs(endDateUtc).diff(startDateUtc, 'days');
  }

  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(endDate).isBefore(startDate);
  }
}
