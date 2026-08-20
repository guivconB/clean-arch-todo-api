import { Task } from "../../domain/entities/Task";

export interface ITaskRepository {
    getTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task | null>;
    createTask(task: Task): Promise<void>;
    updateTask(task: Task): Promise<void>;
    deleteTask(id: string): Promise<void>;
}