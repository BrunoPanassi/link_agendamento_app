import type { InviteStatus } from "./inviteStatus"

export interface Invite {
    id: number
    professionalId: string
    sallonId: string
    status: InviteStatus
}