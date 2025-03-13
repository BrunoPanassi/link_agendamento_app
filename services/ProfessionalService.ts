import type { IProfessionalRepository } from "~/repositories/professional/IProfessionalRepository";
import { BaseService } from "./BaseService";
import { ProfessionalRepository } from "~/repositories/professional/ProfessionalRepository";
import type { Professional } from "~/types/professional";
import type { Hour } from "~/types/hour";
import { Role } from "~/types/role";

const professionalRepository: IProfessionalRepository = ProfessionalRepository

export class ProfessionalService extends BaseService<Professional> {
    constructor() {
        super(professionalRepository)
    }

    async getProfessional(id: string) {
      const professional = await this.findById(id);
  
      if (!professional) {
        throw new Error('Profissional não encontrado');
      }
  
      if (professional.role !== Role.professional) {
        throw new Error('Pessoa não é um profissional');
      }

      return professional;
    }

    async updateProfessionalHours(professionalId: string, hours: Hour[]): Promise<Professional> {
      const professional = await this.getProfessional(professionalId);
  
      professional.hours = hours;
  
      await this.update(professionalId, professional);
  
      return professional;
    }

    async updateProfessionalSallons(professionalId: string, sallonIds: string[]): Promise<Professional> {
      const professional = await this.getProfessional(professionalId);
  
      professional.sallonIds = sallonIds;
  
      await this.update(professionalId, professional);
  
      return professional;
    }

    async updateProfessionalServices(professionalId: string, serviceIds: string[]): Promise<Professional> {
      const professional = await this.getProfessional(professionalId);
  
      professional.serviceIds = serviceIds;
  
      await this.update(professionalId, professional);
  
      return professional;
    }

    async doesProfessionalHasAccount(email: string, password: string) {
        return professionalRepository.findByEmailAndPassword(email, password)
    }
}