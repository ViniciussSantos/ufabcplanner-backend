export interface IDateProvider {
  toDate(date: string): Date;
  convertToUTC(date: Date): string;
  compareInDays(startDate: Date, endDate: Date): number;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
}
