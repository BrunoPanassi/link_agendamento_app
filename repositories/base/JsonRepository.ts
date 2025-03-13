import type { IRepository } from "./IRepository";
import fs from 'fs';
import path from 'path';

export abstract class JsonRepository<T> implements IRepository<T> {
    constructor(private readonly filePath: string) {
        this.filePath = filePath
    }
  
    private async readData(): Promise<T[]> {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    }
  
    private writeData(data: T[]): void {
      fs.writeFileSync(path.join(process.cwd(), this.filePath), JSON.stringify(data, null, 2));
    }
  
    async findAll(): Promise<T[]> {
      return this.readData();
    }
  
    async findById(id: string): Promise<T | null> {
      const data = await this.readData();
      return data.find((item: any) => item.id == id) ?? null;
    }

    async findByIds(ids: string[]): Promise<T[] | null> {
      const data = await this.readData();
      return data.filter((item: any) => ids.includes(item.id) ) ?? null;
    }

    async getLastId(): Promise<number> {
      const data: any = await this.findAll();
      let id = 1;
      if (data.length) {
        id = 1 + data[data.length - 1].id
      }
      return id;
    }
  
    async create(entity: T): Promise<T> {
      const data = await this.readData();
      data.push(entity);
      this.writeData(data);
      return entity;
    }
  
    async update(id: string, entity: Partial<T>): Promise<T | null> {
      const data = await this.readData();
      const index = data.findIndex((item: any) => item.id === id);
      if (index === -1) return null;
      data[index] = { ...data[index], ...entity };
      this.writeData(data);
      return data[index];
    }
  
    async delete(id: string): Promise<string> {
      let data = await this.readData();
      data = data.filter((item: any) => item.id !== id);
      this.writeData(data);
      return id;
    }
  }
  