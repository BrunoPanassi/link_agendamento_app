import { Hour } from "~/types/hour";
import { BaseApiHandler } from "../BaseApiHandler";
import { HourService } from "~/services/HourService";
import { H3Event } from 'h3';

const service = new HourService();

class HourApiHandler extends BaseApiHandler<Hour> {
    async find(event: H3Event) {
        const dayOfWeek = getQuery(event).dayOfWeek as number[]
        if (dayOfWeek) {
          return service.findByDayOfWeek(dayOfWeek)
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

const handler = new HourApiHandler();
export default defineEventHandler((event) => handler.handle(event))