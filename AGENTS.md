# AGENTS.md — Clean Arch To-Do API

Contexto do projeto para pessoas e ferramentas de IA.

## 1. O que é

API REST de tarefas feita **para estudo** de Clean Architecture, SOLID (inversão de dependência) e DDD (domínio rico), em **Node.js + TypeScript 6 + Express 4 + Mongoose**, com Swagger em `/api-docs` e testes unitários com Jest.

> Projeto de aprendizado: ao ajudar, explique o conceito e guie passo a passo em vez de entregar o código pronto.

- **Comandos:** `npm run dev` (ts-node-dev, porta 3000), `npm test`.
- **Banco:** MongoDB local em `mongodb://localhost:27017/clean-architecture-db` (fixo em `src/server.ts`).

## 2. Arquitetura

As dependências só apontam para dentro:

1. **Domain** — `src/domain/entities/Task.ts`: TypeScript puro; valida título no construtor e controla o próprio estado (`complete()`).
2. **Application** — `src/application/repositories/ITaskRepository.ts` e os casos de uso `CreateTask`, `GetTasks`, `CompleteTask`. Só depende do domínio.
3. **Presentation** — `src/presentation/controllers/`: recebem `Request`/`Response` do Express, chamam o caso de uso e devolvem 201/200/400/500.
4. **Infrastructure** — `src/infrastructure/database/TaskRepositoryMongo.ts`: implementa `ITaskRepository` com Mongoose e converte documentos em `Task`.
5. **Composition Root** — `src/server.ts`: cria as instâncias concretas e injeta as dependências.

Os testes (`*.spec.ts`) rodam sem Mongo nem HTTP, com um `InMemoryTaskRepository` em memória.

**Rotas:** `POST /tasks`, `GET /tasks`, `PATCH /tasks/:id/complete`, `GET /api-docs`.

## 3. Decisões e armadilhas

- TypeScript fixado na **v6**: `ts-jest@29` exige `typescript < 7`.
- `"rootDir": "./src"` precisa estar ativo no `tsconfig.json` (senão dá TS5011).
- `npx tsc --noEmit` acusa **TS1295** (`verbatimModuleSyntax` com `"type": "commonjs"`). O `npm run dev` funciona porque usa `--transpile-only`. Resolver isso é uma pendência.

## 4. Próximos passos

- [ ] Caso de uso `DeleteTask` (+ teste, `DeleteTaskController` e rota `DELETE /tasks/:id`). O `deleteTask` já existe no repositório.
- [ ] Habilitar CORS (`cors` + `@types/cors`, `app.use(cors())`) para o frontend.
- [ ] Frontend em Vite + React + TypeScript + Tailwind (+ Axios, Lucide): listar, criar (com validação) e concluir tarefas; filtro Todas/Pendentes/Concluídas como bônus. Tipos em `src/types/task.ts` e chamadas centralizadas em `src/services/api.ts`.
- [ ] Resolver o TS1295 do `tsc`.
- [ ] ESLint e Prettier (opcional).

## 5. Diretrizes

1. Domínio e casos de uso nunca importam Express nem Mongoose.
2. Todo caso de uso novo vem com teste usando o repositório em memória. Rode `npm test` depois de mudar algo.
3. Não cite conversas, prompts nem caminhos absolutos (`C:\...`, `file:///...`) na documentação.
