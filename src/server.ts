import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

// Importando a infraestrutura (Banco real)
import { TaskRepositoryMongo } from "./infrastructure/database/TaskRepositoryMongo";

// Importando os Casos de Uso
import { CreateTask } from "./application/use-cases/CreateTask";
import { GetTasks } from "./application/use-cases/GetTasks";
import { CompleteTask } from "./application/use-cases/CompleteTask";

// Importando os Controllers
import { CreateTaskController } from "./presentation/controllers/CreateTaskController";
import { GetTasksController } from "./presentation/controllers/GetTasksController";
import { CompleteTaskController } from "./presentation/controllers/CompleteTaskController";

const app = express();
app.use(express.json());
// Rota da documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Permite o Express entender JSON no body das requisições

// 1. INJEÇÃO DE DEPENDÊNCIA (Montando os blocos)
// A) Criamos a instância do banco de dados real
const taskRepository = new TaskRepositoryMongo();

// B) Criamos os casos de uso, injetando o banco real neles
const createTaskUseCase = new CreateTask(taskRepository);
const getTasksUseCase = new GetTasks(taskRepository);
const completeTaskUseCase = new CompleteTask(taskRepository);

// C) Criamos os controllers, injetando os casos de uso neles
const createTaskController = new CreateTaskController(createTaskUseCase);
const getTasksController = new GetTasksController(getTasksUseCase);
const completeTaskController = new CompleteTaskController(completeTaskUseCase);

// 2. DEFININDO AS ROTAS (Ligando a URL ao Controller)
// Dica do Express: Precisamos usar o bind() ou usar uma arrow function 
// para o "this" não se perder dentro da classe do controller.
app.post("/tasks", (req, res) => createTaskController.handle(req, res));
app.get("/tasks", (req, res) => getTasksController.handle(req, res));
app.patch("/tasks/:id/complete", (req, res) => completeTaskController.handle(req, res));

// 3. CONECTANDO AO BANCO E SUBINDO O SERVIDOR
// Importante: Certifique-se de que você tem o MongoDB rodando na sua máquina 
// (ou troque essa string por uma do MongoDB Atlas se preferir).
const MONGO_URI = "mongodb://localhost:27017/clean-architecture-db";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("🔥 Conectado ao MongoDB com sucesso!");
    
    app.listen(3000, () => {
      console.log("🚀 Servidor rodando na porta 3000!");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco:", err);
  });