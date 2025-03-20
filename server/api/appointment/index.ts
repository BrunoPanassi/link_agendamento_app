import { Appointment } from "~/types/appointment";
import { BaseApiHandler } from "../BaseApiHandler";
import { H3Event } from 'h3'
import { AppointmentService } from "~/services/AppointmentService";

const service = new AppointmentService();

class AppointmentApiHandler extends BaseApiHandler<Appointment> {
    async find(event: H3Event) {
        const ids = getQuery(event).ids as string[]
        if (ids) {
            return service.findByIds(ids);
        }
        const id = getQuery(event).id as string
        if (id) {
            return service.findById(id);
        }
        const userId = getQuery(event).userId as number;
        const professionalId = getQuery(event).professionalId as number;
        const sallonId = getQuery(event).sallonId as number;
        const serviceId = getQuery(event).serviceId as number;
        if (userId || professionalId || sallonId || serviceId) {
          return service.findBy(userId, professionalId, sallonId, serviceId)
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

const handler = new AppointmentApiHandler();

export default defineEventHandler((event) => handler.handle(event))