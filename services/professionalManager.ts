import type { ProfessionalPerson, Professional } from "~/types/professional";
import type { Response } from "~/types/response";

const URI = '/api/professional'

const saveProfessional = async (professional: Professional) => {
    try {
        const response: Response = await $fetch(URI, {
            method: 'POST',
            body: { item: {
                "personId": professional.personId,
                "password": professional.password
            }}
        });
        if (response.success)
            return response.data as Professional
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar um profissional"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getProfessional = async (personId: number, password: string) => {
    try {
        const response: Response = await $fetch(URI.concat(`?personId=${personId}&&password=${password}`))

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Professional
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar uma informação sobre profissional"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getProfessionalByIds = async (ids: number[]) => {
    try {
        const response: Response = await $fetch(URI, {
            method: 'GET',
            params: {
                ids: ids
            }
        })
        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as ProfessionalPerson[]
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar uma informação sobre profissionais"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export { saveProfessional, getProfessional, getProfessionalByIds }