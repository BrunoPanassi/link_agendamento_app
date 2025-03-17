import type { Invite } from "~/types/invite";
import type { IRepository } from "../base/IRepository";
import type { InviteStatus } from "~/types/inviteStatus";

export default interface IInvteRepository extends IRepository<Invite> {
    findByProfessionalId(professionalId: string): Promise<Invite[] | null>;
    findBySallonId(sallonId: string): Promise<Invite[] | null>;
    findByProfessionalAndSallonId(professionalId: string, sallonId: string) :  Promise<Invite[] | null>;
    updateStatus(inviteId: string, status: InviteStatus): Promise<Invite | null>
}