import { InviteService } from "~/services/InviteService";
import { BaseApiHandler } from "../BaseApiHandler";
import { Invite } from "~/types/invite";
import { H3Event } from 'h3';
import { InviteStatus } from "~/types/inviteStatus";

const service = new InviteService();

class InviteApiHandler extends BaseApiHandler<Invite> {
    async find(event: H3Event) {
        const professional = getQuery(event).professional as string
        const sallon = getQuery(event).sallon as string
        if (professional && sallon) {
            return service.findByProfessionalAndSallonId(professional, sallon)
        }

        if (professional) {
            return service.findByProfessionalId(professional)
        }

        if (sallon) {
            return service.findBySallonId(sallon)
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
      body.status = InviteStatus.pending
      return await service.create(body);
    }
  
    async update(event: H3Event) {
      const body = await readBody(event);
      const status = getQuery(event).status as InviteStatus
      const { id } = body
      if (status) return service.updateStatus(id, status)
      return service.update(body.id, body);
    }
  
    async delete(event: H3Event) {
      const id = getQuery(event).id as string;
      return service.delete(id);
    }
}

const handler = new InviteApiHandler();

export default defineEventHandler((event) => handler.handle(event))