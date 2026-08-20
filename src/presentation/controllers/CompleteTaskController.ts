import { Request, Response } from "express";
import { CompleteTask } from "../../application/use-cases/CompleteTask";

export class CompleteTaskController {
  constructor(private completeTaskUseCase: CompleteTask) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      // 1. Extraímos o 'id' que vem da URL (req.params)
      // Se a URL for /tasks/123, req.params.id será "123".
      const { id } = req.params;

      // 2. Passamos esse ID para o nosso Caso de Uso processar.
      const task = await this.completeTaskUseCase.execute({ id });

      // 3. Retornamos a tarefa atualizada com status 200 (OK).
      return res.status(200).json(task);
      
    } catch (error: any) {
      // 4. Se o Caso de Uso não achar a tarefa, ele lança aquele erro "Task not found".
      // Nós capturamos o erro aqui e devolvemos um status 400 (Bad Request).
      // Se quiser ser mais purista na Web, poderia ser 404 (Not Found).
      return res.status(400).json({ error: error.message });
    }
  }
}