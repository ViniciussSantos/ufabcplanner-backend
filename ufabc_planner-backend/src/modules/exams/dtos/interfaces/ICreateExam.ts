export interface ICreateExam {
  subjectId: string;
  userId: string;
  name: string;
  dueDate: string;
  time: string;
  description?: string;
}
