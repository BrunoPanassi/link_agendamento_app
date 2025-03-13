import { Manager } from "~/types/manager";
import { BaseApiHandler } from "../BaseApiHandler";
import { ManagerService } from "~/services/ManagerService";
import { H3Event } from 'h3';
import { Role } from "~/types/role";

const service = new ManagerService()

class ManagerApiHandler extends BaseApiHandler<Manager> {
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
      body.role = Role.manager
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
  
  const handler = new ManagerApiHandler();
  
  export default defineEventHandler((event) => handler.handle(event));
