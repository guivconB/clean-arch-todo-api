import mongoose from "mongoose";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../application/repositories/ITaskRepository";

// 1. Criamos o Schema do Mongoose (Como a tarefa será salva fisicamente no banco)
const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Usamos o nosso próprio ID gerado
  title: { type: String, required: true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Criamos o Model do Mongoose (A ferramenta que faz o CRUD de verdade)
const TaskModel = mongoose.model("Task", TaskSchema);

// 2. Criamos o nosso repositório real
export class TaskRepositoryMongo implements ITaskRepository {
  
  async createTask(task: Task): Promise<void> {
    // Usamos o model do mongoose para salvar no banco
    await TaskModel.create({
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
    });
  }

  async getTasks(): Promise<Task[]> {
    const taskDocs = await TaskModel.find();
    // O Mongoose devolve 'Documentos'. Precisamos converter de volta para nossa Entidade 'Task'
    return taskDocs.map(doc => 
      new Task(doc.id, doc.title, doc.description || "", doc.isCompleted, doc.createdAt)
    );
  }

  async getTaskById(id: string): Promise<Task | null> {
    const doc = await TaskModel.findOne({ id });
    if (!doc) return null;
    return new Task(doc.id, doc.title, doc.description || "", doc.isCompleted, doc.createdAt);
  }

  async updateTask(task: Task): Promise<void> {
    // Atualiza a tarefa no banco buscando pelo nosso campo 'id'
    await TaskModel.updateOne(
      { id: task.id },
      {
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted
      }
    );
  }

  async deleteTask(id: string): Promise<void> {
    await TaskModel.deleteOne({ id });
  }
}