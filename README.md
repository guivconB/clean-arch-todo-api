# Clean Architecture To-Do API

Uma API de gerenciamento de tarefas construída do zero para estudo e aplicação dos conceitos de **Clean Architecture**, **SOLID** e **Domain-Driven Design (DDD)**. 

O projeto foi desenvolvido em **TypeScript** e utiliza **Node.js**, **Express** e **MongoDB** (via Mongoose), mantendo um forte desacoplamento entre as regras de negócio e as tecnologias de infraestrutura.

## 🏗️ Arquitetura

O projeto segue a separação por camadas da Clean Architecture:

- **Domain (`src/domain`)**: O coração da aplicação. Contém as Entidades (`Task`) e as regras de negócio puras. Não possui dependências externas.
- **Application (`src/application`)**: Contém os Casos de Uso (`CreateTask`, `GetTasks`, `CompleteTask`) e as Interfaces (Contratos) dos repositórios. Orquestra o fluxo de dados.
- **Adapters (`src/presentation/controllers`)**: Responsável por traduzir as requisições HTTP do Express para um formato que a camada de Aplicação entenda, e vice-versa.
- **Infrastructure (`src/infrastructure` & `src/server.ts`)**: A camada mais externa. É onde os frameworks (Express) e o banco de dados (MongoDB/Mongoose) são implementados de fato.

## 🚀 Tecnologias Utilizadas

- **TypeScript**
- **Node.js** com **Express**
- **MongoDB** com **Mongoose**
- **Jest** (Testes Unitários)
- **ts-node-dev** (Ambiente de desenvolvimento)
- **Swagger UI** (documentação interativa em `/api-docs`)

## 🛠️ Como rodar o projeto

### Pré-requisitos
- Node.js instalado.
- Um servidor MongoDB rodando na máquina (porta padrão `27017`) ou uma URL do MongoDB Atlas (alterar no `server.ts`).

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/guivconB/clean-arch-todo-api.git
   cd clean-arch-todo-api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   A API estará rodando em `http://localhost:3000` e a documentação Swagger em `http://localhost:3000/api-docs`.

## 🧪 Como rodar os testes

A arquitetura limpa permite testar as regras de negócio em milissegundos sem precisar de conexão com o banco de dados.

```bash
npm test
```

## 📝 Endpoints (Rotas da API)

- **`POST /tasks`**: Cria uma nova tarefa.
  - *Body*: `{"title": "Sua tarefa", "description": "Sua descrição"}`
- **`GET /tasks`**: Lista todas as tarefas.
- **`PATCH /tasks/:id/complete`**: Marca uma tarefa específica como concluída.
- **`GET /api-docs`**: Documentação Swagger interativa.

## 🗺️ Próximos passos

- [ ] Caso de uso `DeleteTask` com a rota `DELETE /tasks/:id`.
- [ ] Habilitar CORS para um frontend.
- [ ] Frontend em React + Vite + TypeScript consumindo a API.
