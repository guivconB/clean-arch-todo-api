import { Task } from "./Task";

describe ("Teste da classe task", () => {
    it("deve criar uma tarefa", () => {
        const task = new Task("1", "Task 1", "Description 1", false, new Date());
        expect(task.id).toBe("1");
        expect(task.title).toBe("Task 1");
        expect(task.description).toBe("Description 1");
        expect(task.isCompleted).toBe(false);
        expect(task.createdAt).toBeInstanceOf(Date);
    })
  it("deve lançar um erro se o título for vazio", () => {
        expect(() => {
            new Task("1", "", "Description 1", false, new Date());
        }).toThrow("Title cannot be empty");
    });
})