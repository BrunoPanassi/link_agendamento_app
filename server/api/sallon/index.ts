import { SallonService } from "~/services/SallonService";
import { BaseApiHandler } from "../BaseApiHandler";
import { H3Event } from 'h3';
import { Sallon } from "~/types/sallon";

const service = new SallonService();

class ProfessionalApiHandler extends BaseApiHandler<Sallon> {
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
      if (!body?.id) body.id = await service.getLastId();
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
  
  const handler = new ProfessionalApiHandler();
  
  export default defineEventHandler((event) => handler.handle(event));