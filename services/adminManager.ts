import type { Admin } from "~/types/admin";
import type { Response } from "~/types/response";

const URI: string = '/api/admin';


const saveAdmin = async (personId: number, email: string, password: string) => {
    try {
        const response: Response  = await $fetch(URI, {
            method: 'POST',
            body: { item: {
                personId,
                email,
                password
            } },
        });
        if (response.success && response.status == 200)
            return response.data as Admin
        if (!response.success && response.status == 400)
            return response.message
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar uma pessoa"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

const getAdmin = async(email: string, password: string) => {
    try {
        const response: Response = await $fetch(URI.concat(`?email=${email}&password=${password}`))
        
        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Admin
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

export { saveAdmin, getAdmin }