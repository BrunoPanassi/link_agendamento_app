import type { IRepository } from "~/repositories/base/IRepository";

export class BaseService<T> {
    protected repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
        this.repository = repository
    }

    async getLastId(): Promise<number> {
        return this.repository.getLastId()
    }

    async findById(id: string): Promise<T | null> {
        return this.repository.findById(id);
    }

    async findByIds(ids: string[]): Promise<T[] | null> {
        return this.repository.findByIds(ids)
    }
    
    async findAll(): Promise<T[]> {
        return this.repository.findAll();
    }

    async create(data: T): Promise<T> {
        return this.repository.create(data);
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<string> {
        return this.repository.delete(id);
    }
}