// Importamos os tipos 'Request' (requisição) e 'Response' (resposta) do Express
// Isso ajuda o TypeScript a saber o que tem dentro do 'req' e do 'res'.
import { Request, Response } from "express";

// Importamos o nosso caso de uso que sabe como criar uma tarefa
import { CreateTask } from "../../application/use-cases/CreateTask";

export class CreateTaskController {
  // Assim como fizemos antes, usamos injeção de dependência.
  // O Controller não precisa saber COMO a tarefa é criada no banco, 
  // ele só precisa de alguém (o caso de uso) que saiba fazer isso.
  constructor(private createTaskUseCase: CreateTask) {}

  // O método 'handle' (lidar) é o padrão para processar a requisição web.
  // Ele sempre recebe o req (dados que o usuário enviou) e o res (objeto para enviar a resposta).
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      // 1. Extraímos os dados que o usuário enviou no "corpo" da requisição (body)
      const { title, description } = req.body;

      // 2. Chamamos o caso de uso passando os dados
      // Se tivermos algum erro de validação (ex: título vazio), 
      // o erro vai ser lançado aqui e cairá no "catch" ali embaixo.
      const task = await this.createTaskUseCase.execute({ title, description });

      // 3. Se tudo deu certo, devolvemos o status HTTP 201 (Created/Criado)
      // e enviamos a tarefa recém-criada no formato JSON.
      return res.status(201).json(task);
      
    } catch (error: any) {
      // 4. Se a Entidade ou o Caso de Uso lançarem um "throw new Error(...)",
      // o código cai aqui. Retornamos o status HTTP 400 (Bad Request/Requisição Inválida)
      // com a mensagem de erro que configuramos lá na nossa Entidade!
      return res.status(400).json({ error: error.message });
    }
  }
}