import type { Response } from "~/types/response";
import type { Service } from "~/types/service";

const URI = '/api/service'

export const saveService = async (title: string, description: string, time: string, image: string, price: string) => {
    try {
        const response: Response = await $fetch(URI, {
            method: 'POST',
            body: {
                item: {
                    title,
                    description,
                    time,
                    image,
                    price
                }
            }
        })
        if (response.success)
            return response.data as Service
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar um serviço"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export const getServiceByTItle = async (title: string) => {
    try {
        const response: Response = await $fetch(URI.concat(`?title=${title}`))

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Service
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar os dados de um serviço"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export const getServiceByIds = async (ids: number[]) => {
    try {
        const response: Response = await $fetch(URI.concat(`?ids=${ids}`))

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Service[]
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar os dados de serviços"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export const updateServiceById = async (id: number, service: Service) => {
    try {
        const response: Response = await $fetch(URI.concat(`?id=${id}`), {
            method: 'PUT',
            body: {
                item: {
                    ...service
                }
            }
        })

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Service
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao buscar os dados de um serviço"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export const deleteServiceById = async (id: number) => {
    try {
        const response: Response = await $fetch(URI.concat(`?id=${id}`), {
            method:'DELETE'
        })

        if (response.success && response.status == 200)
            return {
                success: true,
                data: response.data as Service
            }
        if (!response.success && response.status == 400)
            return {
                success: false,
                message: response.message
            }
        return null 
    } catch (e) {
        let message = "Erro no pŕocesso ao deletar o dado de um serviço"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}