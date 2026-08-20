import { Request, Response } from "express";
import { GetTasks } from "../../application/use-cases/GetTasks";

export class GetTasksController {
  // Recebemos o caso de uso de listagem no construtor
  constructor(private getTasksUseCase: GetTasks) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      // 1. Não precisamos pegar nada do 'req' (nenhum dado de entrada é necessário para listar).
      // Apenas executamos o caso de uso diretamente.
      const tasks = await this.getTasksUseCase.execute();

      // 2. Devolvemos o status 200 (OK - Padrão de sucesso) com a lista de tarefas.
      return res.status(200).json(tasks);
      
    } catch (error: any) {
      // 3. Em caso de algum erro imprevisto, devolvemos 500 (Erro interno do servidor)
      return res.status(500).json({ error: error.message });
    }
  }
}