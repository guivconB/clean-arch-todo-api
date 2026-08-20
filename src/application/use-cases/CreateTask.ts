// 1. Importa a função nativa do Node.js para gerar IDs únicos aleatórios (UUID v4)
import { randomUUID } from "crypto";

// 2. Importa a classe da entidade Task (regras e formato da tarefa no sistema)
import { Task } from "../../domain/entities/Task";

// 3. Importa o contrato (interface) que define como interagir com o banco de dados
import { ITaskRepository } from "../repositories/ITaskRepository";

// 4. Define a tipagem dos dados de entrada que a função execute vai exigir
export interface CreateTaskInput {
  title: string;
  description: string;
}

// 5. Criação da classe responsável pelo caso de uso de criação
export class CreateTask {
  // 6. O constructor recebe a interface do repositório. 
  // O modificador 'private' já cria e atribui automaticamente 'this.taskRepository'
  constructor(private taskRepository: ITaskRepository) {}

  // 7. Método assíncrono que executa o fluxo de criação e promete retornar uma Task
  async execute(input: CreateTaskInput): Promise<Task> {
    // 8. Gera um identificador único (ex: "c3b9b46e-7813-4b68-80f4-d50d03eefdf0")
    const id = randomUUID();

    // 9. Extrai o título e a descrição recebidos no parâmetro input
    const { title, description } = input;

    // 10. Instancia o objeto de domínio Task com os dados:
    // (id, title, description, concluída = false, data de criação = new Date())
    const task = new Task(id, title, description, false, new Date());

    // 11. Envia a tarefa para ser salva através do repositório e aguarda (await) a gravação
    await this.taskRepository.createTask(task);

    // 12. Devolve a instância da tarefa pronta para quem chamou este caso de uso
    return task;
  }
}