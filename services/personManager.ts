import type { Person } from "~/types/person";
import type { Response } from "~/types/response";
import type { Role } from "~/types/role";

const URI = '/api/modifyPersonJson'

const savePerson = async (name: string, phoneNumber: number, role: Role) => {
    try {
        const response: Response = await $fetch(URI, {
            method: 'POST',
            body: { item: {
                name,
                phoneNumber,
                roles: role    
            } }
        });
        if (response.success)
            return response.data as Person
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar uma pessoa"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getPerson = async (phoneNumber: string) => {
    try {
        const response: Response = await $fetch(URI.concat(`?phoneNumber=${phoneNumber}`))

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Person
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar o data de uma pessoa"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getPersonByIds = async (ids: number[]) => {
    try {
        const response: Response = await $fetch(URI.concat(`?ids=${ids}`))
        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Person[]
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar o data de uma pessoa"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export { savePerson, getPerson, getPersonByIds }