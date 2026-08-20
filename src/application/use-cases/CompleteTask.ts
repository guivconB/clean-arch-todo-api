import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";

// Define a interface para os dados de entrada (input)
export interface CompleteTaskInput {
  id: string;
}

export class CompleteTask {
  // 1. Recebe o taskRepository no construtor
  constructor(private taskRepository: ITaskRepository) {}

  // 2. Método execute que recebe um input contendo o ID e retorna uma Promise de Task
  async execute(input: CompleteTaskInput): Promise<Task> {
    // 3. Busca a tarefa no repositório pelo ID
    const task = await this.taskRepository.getTaskById(input.id);

    // 4. Validação: Se a tarefa não existir, lança um erro
    if (!task) {
      throw new Error("Task not found");
    }

    // 5. Se ela existir, marca como concluída (usando a lógica de negócio do domínio)
    task.complete();

    // 6. Salva a alteração de volta no repositório
    await this.taskRepository.updateTask(task);

    // 7. Retorna a tarefa atualizada
    return task;
  }
}
