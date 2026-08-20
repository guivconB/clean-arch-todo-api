// Definindo a classe
export class Task {
    // Atributos
    public id: string
    public title: string
    public description: string
    isCompleted: boolean
    createdAt: Date

    // Adicione isso dentro da classe Task, abaixo do constructor:
    public complete(): void {
        this.isCompleted = true;
    }

    // Método construtor
    constructor(id: string, title: string, description: string, isCompleted: boolean, createdAt: Date) {
        if (title === "") {
            throw new Error("Title cannot be empty")
        }
        this.id = id;
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
        this.createdAt = createdAt;
    }
}