import { Task } from '@prisma/client';
import { CreateTaskDTO } from '../dtos/CreateTask.dto';
import { UpdateTaskDTO } from '../dtos/UpdateTask.dto';

export interface ITaskRepository {
  createTask(params: CreateTaskDTO): Promise<void>;
  deleteTask(id: string): Promise<void>;
  updateTask(params: UpdateTaskDTO): Promise<void>;
  getTasksBySubjectId(subjectId: string): Promise<Task[]>;
  getTasksByUserId(userId: string): Promise<Task[]>;
  taskExists(id: string): Promise<Boolean>;
}
