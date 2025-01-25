import type { Response } from "~/types/response"
import type { Sallon } from "~/types/sallon"

const URI = '/api/sallon'

const saveSallon = async (personId: number, name: string, description: string, address: string, city: string) => {
    try {
        const response: Response = await $fetch(URI, {
            method: 'POST',
            body: {
                item: {
                    personId,
                    name,
                    description,
                    address,
                    city
                }
            }
        })
        if (response.success)
            return response.data as Sallon
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar um salão"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getSallonByName = async (name: string) => {
    try {
        const response: Response = await $fetch(URI.concat(`?name=${name}`))

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Sallon
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar os dados de um salão"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getSallonByPersonId = async (personId: number) => {
    try {
        const response: Response = await $fetch(URI.concat(`?personId=${personId}`))

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Sallon[]
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar os dados de um salão"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export { saveSallon, getSallonByName, getSallonByPersonId }