import { ProfessionalService } from "~/services/ProfessionalService";
import { BaseApiHandler } from "../BaseApiHandler";
import { Professional } from "~/types/professional";
import { H3Event } from 'h3';

const service = new ProfessionalService();

class ProfessionalApiHandler extends BaseApiHandler<Professional> {
    async find(event: H3Event) {
        const email = getQuery(event).email as string
        const password = getQuery(event).password as string
        if (email && password) {
            return service.doesProfessionalHasAccount(email, password)
        }
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
      body.role = 'professional'
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
