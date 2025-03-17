import type { Invite } from "~/types/invite";
import { BaseService } from "./BaseService";
import { InviteRepository } from "~/repositories/invite/InviteRepository";
import type IInvteRepository from "~/repositories/invite/IInviteRepository";
import { InviteStatus } from "~/types/inviteStatus";
import { ProfessionalService } from "./ProfessionalService";

const inviteRepository: IInvteRepository = InviteRepository
const professionalService = new ProfessionalService();

export class InviteService extends BaseService<Invite> {
    constructor() {
        super(inviteRepository)
    }

    async findByProfessionalAndSallonId(professionalId: string, sallonId: string) :  Promise<Invite[] | null> {
        return await inviteRepository.findByProfessionalAndSallonId(professionalId, sallonId);
    }

    async findByProfessionalId(professionalId: string): Promise<Invite[] | null> {
        return await inviteRepository.findByProfessionalId(professionalId)
    }
    
    async findBySallonId(sallonId: string): Promise<Invite[] | null> {
        return await inviteRepository.findBySallonId(sallonId)
    }
    
    async updateStatus(inviteId: string, status: InviteStatus) {
        const invite = await this.findById(inviteId)
        if (invite) {
            if (status != InviteStatus.pending) {
                if (status == InviteStatus.accepted) await professionalService.updateProfessionalSallons(invite.professionalId, invite.sallonId)
                this.delete(inviteId)
            
                invite.status = status
                return invite
            }
        } else {
            throw new Error("Convite não encontrado.")
        }

        return await inviteRepository.updateStatus(inviteId, status)
    }

    override async create(data: Invite): Promise<Invite> {
        const { professionalId, sallonId} = data
        const invite = await this.findByProfessionalAndSallonId(professionalId, sallonId)
        if (invite?.length) throw new Error("Profissional e salão já existentes em convite.")
        return await inviteRepository.create(data)
    }
}