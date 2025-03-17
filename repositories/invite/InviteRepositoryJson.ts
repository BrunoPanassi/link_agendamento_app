import type { Invite } from "~/types/invite";
import { JsonRepository } from "../base/JsonRepository";
import type IInvteRepository from "./IInviteRepository";
import type { InviteStatus } from "~/types/inviteStatus";

export class InviteRepositoryJson extends JsonRepository<Invite> implements IInvteRepository {
    constructor() {
        super('data/invite.json')
    }

    async findByProfessionalAndSallonId(professionalId: string, sallonId: string) :  Promise<Invite[] | null> {
        const invites = await this.findAll();
        return invites.filter(invite => invite.professionalId == professionalId && invite.sallonId == sallonId);
    }

    async findByProfessionalId(professionalId: string): Promise<Invite[]> {
        const invites = await this.findAll();
        return invites.filter(invite => invite.professionalId === professionalId);
    }
    
    async findBySallonId(sallonId: string): Promise<Invite[]> {
        const invites = await this.findAll();
        return invites.filter(invite => invite.sallonId === sallonId);
    }
    
    async updateStatus(inviteId: string, status: InviteStatus): Promise<Invite | null> {
        const invite = await this.findById(inviteId);
        if (!invite) return null;

        invite.status = status;
        await this.update(inviteId, invite);
        return invite;
    }
}