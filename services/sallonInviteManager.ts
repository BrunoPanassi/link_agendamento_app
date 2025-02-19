import type { Response } from "~/types/response";
import type { SallonInvite } from "~/types/sallonInvite";

const URI = '/api/sallonInvite'

const create = async (invite: SallonInvite) => {
    try {
        const response: Response = await $fetch(URI, {
            method: 'POST',
            body: { item: {
                "sallonId": invite.sallonId,
                "professionalIds": invite.professionalIds
            }}
        });
        if (response)
            return response.data as SallonInvite
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao enviar um convite."
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const update = async (sallonId: number, professionalIds: number[]) => {
    try {
        const response: Response = await $fetch(URI.concat(`?sallonId=${sallonId}`), {
            method: 'PUT',
            body: {
                item: {
                    ...professionalIds
                }
            }
        })

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as SallonInvite
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar os dados do convite"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getBySallon = async (sallonId: number) => {
    try {
        const response: Response = await $fetch(URI.concat(`?sallonId=${sallonId}`))

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as SallonInvite
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar os dados de um convite"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getByProfessional = async (professionalId: number) => {
    try {
        const response: Response = await $fetch(URI.concat(`?professionalId=${professionalId}`))

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as SallonInvite
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar os dados de um convite"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const remove = async (sallonId: number) => {
    try {
        const response: Response = await $fetch(URI.concat(`?sallonId=${sallonId}`), {
            method:'DELETE'
        })

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as SallonInvite
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null 
    } catch (e) {
        let message = "Erro no pŕocesso ao deletar o dado de um convite"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export { create, update, getBySallon, getByProfessional, remove }