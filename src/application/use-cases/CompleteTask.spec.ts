import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";
import { CompleteTask } from "./CompleteTask";

// Criamos um banco de dados fake em memória para o teste
class InMemoryTaskRepository implements ITaskRepository {
  public tasks: Task[] = [];

  async createTask(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  // Buscamos a tarefa no array pelo ID
  async getTaskById(id: string): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    return task || null;
  }

  // Atualizamos a tarefa correspondente no array
  async updateTask(task: Task): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  async deleteTask(id: string): Promise<void> {}
}

describe("CompleteTask Use Case", () => {
  it("deve marcar uma tarefa existente como concluída", async () => {
    // -------------------------------------------------------------
    // ETAPA 1: ARRANGE (Preparar o cenário)
    // -------------------------------------------------------------
    const fakeRepository = new InMemoryTaskRepository();
    
    // Criamos uma tarefa com isCompleted = false
    const task = new Task("task-id-123", "Estudar Clean Architecture", "Descrição", false, new Date());
    fakeRepository.tasks.push(task);

    const useCase = new CompleteTask(fakeRepository);

    // -------------------------------------------------------------
    // ETAPA 2: ACT (Executar a ação)
    // -------------------------------------------------------------
    const result = await useCase.execute({ id: "task-id-123" });

    // -------------------------------------------------------------
    // ETAPA 3: ASSERT (Verificar se deu certo)
    // -------------------------------------------------------------
    // A. A tarefa retornada deve estar marcada como concluída
    expect(result.isCompleted).toBe(true);

    // B. A tarefa dentro do banco fake também deve estar como concluída
    const savedTask = await fakeRepository.getTaskById("task-id-123");
    expect(savedTask?.isCompleted).toBe(true);
  });

  it("deve lançar um erro se a tarefa não for encontrada", async () => {
    // -------------------------------------------------------------
    // ETAPA 1: ARRANGE (Preparar o cenário)
    // -------------------------------------------------------------
    const fakeRepository = new InMemoryTaskRepository();
    const useCase = new CompleteTask(fakeRepository);

    // -------------------------------------------------------------
    // ETAPA 2 & 3: ACT & ASSERT
    // -------------------------------------------------------------
    // Esperamos que o método execute lance uma exceção (erro) com a mensagem "Task not found"
    await expect(
      useCase.execute({ id: "id-que-nao-existe" })
    ).rejects.toThrow("Task not found");
  });
});
