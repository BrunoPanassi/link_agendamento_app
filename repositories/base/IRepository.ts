// src/repositories/base/IRepository.ts
export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findByIds(ids: string[]): Promise<T[] | null>;
    getLastId(): Promise<number>;
    create(entity: T): Promise<T>;
    update(id: string, entity: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
  }  