import { ServiceService } from "~/services/ServiceService";
import { BaseApiHandler } from "../BaseApiHandler";
import { Service } from "~/types/service";
import { H3Event } from 'h3';

const service = new ServiceService();

class ServiceApiHandler extends BaseApiHandler<Service> {
    async find(event: H3Event) {
      const ids = getQuery(event).ids as string[]
        if (ids) {
            return service.findByIds(ids);
        }
        const id = getQuery(event).id as string
        if (id) {
            return service.findById(id);
        }
        return service.findAll()
    }

    async create(event: H3Event) {
      const body = await readBody(event);
      body.id ??= await service.getLastId();
      return service.create(body);
    }
  
    async update(event: H3Event) {
      const body = await readBody(event);
      return service.update(body.id, body);
    }
  
    async delete(event: H3Event) {
      const id = getQuery(event).id as string;
      return service.delete(id);
    }
  }
  
  const handler = new ServiceApiHandler();
  
  export default defineEventHandler((event) => handler.handle(event));