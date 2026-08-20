import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";
import { GetTasks } from "./GetTasks";

// 1. Criamos o mesmo banco de dados fake na memória
class InMemoryTaskRepository implements ITaskRepository {
  public tasks: Task[] = [];

  async createTask(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  // Métodos vazios só para satisfazer a interface
  async getTaskById(id: string): Promise<Task | null> { return null; }
  async updateTask(task: Task): Promise<void> {}
  async deleteTask(id: string): Promise<void> {}
}

describe("GetTasks Use Case", () => {
  it("deve retornar uma lista com todas as tarefas cadastradas", async () => {
    // -------------------------------------------------------------
    // ETAPA 1: ARRANGE (Preparar o cenário)
    // -------------------------------------------------------------
    const fakeRepository = new InMemoryTaskRepository();

    // Vamos criar duas tarefas reais usando a receita da Entidade Task
    const task1 = new Task("1", "Tarefa 1", "Descrição 1", false, new Date());
    const task2 = new Task("2", "Tarefa 2", "Descrição 2", false, new Date());

    // Vamos colocar essas tarefas manualmente dentro do array do nosso banco fake
    fakeRepository.tasks.push(task1);
    fakeRepository.tasks.push(task2);

    // Agora, instanciamos o caso de uso passando o banco de dados fake
    const useCase = new GetTasks(fakeRepository);

    // -------------------------------------------------------------
    // ETAPA 2: ACT (Executar a ação)
    // -------------------------------------------------------------
    // Chame a função execute() do seu caso de uso (use o await!)
    // Guarde o resultado numa constante chamada 'result'
    const result = await useCase.execute();
    console.log(result);

    // -------------------------------------------------------------
    // ETAPA 3: ASSERT (Verificar se deu certo)
    // -------------------------------------------------------------
    // Agora precisamos garantir que o 'result' (que é um array de tarefas) 
    // veio com as tarefas que cadastramos acima.

    // A. Garanta que o tamanho do array retornado é igual a 2:
    expect(result).toHaveLength(2); 

    // B. Garanta que a primeira tarefa do resultado é igual a task1
    expect(result[0]).toEqual(task1);

    // C. (Escreva você) Garanta que a segunda tarefa do resultado (result[1]) é igual a task2
    expect(result[1]).toEqual(task2);
  });
});