// 1. Importa a classe da entidade Task
import { Task } from "../../domain/entities/Task";

// 2. Importa o contrato (interface) do repositório
import { ITaskRepository } from "../repositories/ITaskRepository";

// 3. Criação da classe do caso de uso de listagem de tarefas
export class GetTasks {
  // 4. Recebe a interface do repositório no construtor
  // O modificador 'private' cria automaticamente a propriedade 'this.taskRepository'
  constructor(private taskRepository: ITaskRepository) {}

  // 5. Método assíncrono para executar a busca e retornar a lista de tarefas
  async execute(): Promise<Task[]> {
    // 6. Chama o método do repositório e retorna a promessa resolvida com a lista
    return this.taskRepository.getTasks();
  }
}
