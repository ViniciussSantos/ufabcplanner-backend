export type Weekday = 'seg' | 'ter' | 'quar' | 'quin' | 'sex' | 'sab' | 'dom'

export type BiweeklyType = 'week1' | 'week2'

export interface IClass {
  id: string;
  subjectId: string;
  userId: string;
  professor?: string;
  room?: string;
  campus?: string;
  bulding?: string;
  startTime: string;
  endTime: string;
  weekday: Weekday;
  biweeklyType?: BiweeklyType
}

export const translateWeekday = {
  seg: 'Segunda-feira',
  ter: 'Terça-feira',
  quar: 'Quarta-feira',
  quin: 'Quinta-feira',
  sex: 'Sexta-feira',
  sab: 'Sábado-feira',
  dom: 'Domingo-feira',
}

export const translateBiweeklyType = {
  week1: 'Quinzenal I',
  week2: 'Quinzenal II',
}
