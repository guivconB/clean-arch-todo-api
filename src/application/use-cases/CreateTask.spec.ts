import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";
import { CreateTask } from "./CreateTask";

// Criamos um banco de dados fake na memória
class InMemoryTaskRepository implements ITaskRepository {
  // Uma lista para simular a tabela do banco
  public tasks: Task[] = [];

  async createTask(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  // O TypeScript vai exigir que você declare as outras funções da interface
  // mesmo que vazias, para assinar o contrato corretamente:
  async getTasks(): Promise<Task[]> { return this.tasks; }
  async getTaskById(id: string): Promise<Task | null> { return null; }
  async updateTask(task: Task): Promise<void> {}
  async deleteTask(id: string): Promise<void> {}
}

describe("CreateTask Use Case", () => {
  it("deve criar uma tarefa e salvar no repositório", async () => {
    // 1. Instanciar o nosso banco fake
    const fakeRepository = new InMemoryTaskRepository();

    // 2. Instanciar o caso de uso, passando o banco fake para ele
    const useCase = new CreateTask(fakeRepository);

    // 3. Executar o caso de uso com dados de teste
    const result = await useCase.execute({
      title: "Minha tarefa de teste",
      description: "Descrição do teste"
    });

    // 4. Asserções (expect):
    // - O result deve ter um 'id' gerado
    // - O result.title deve ser "Minha tarefa de teste"
    // - O tamanho da lista 'fakeRepository.tasks' deve ser 1 (significa que salvou no banco fake!)
    // - O elemento dentro de 'fakeRepository.tasks[0]' deve ser igual ao result

    expect(result.id).toBeDefined();
    expect(result.title).toBe("Minha tarefa de teste");
    expect(result.description).toBe("Descrição do teste");
    expect(fakeRepository.tasks.length).toBe(1);
    expect(fakeRepository.tasks[0]).toEqual(result);
  });
});