import type { Person } from "~/types/person";
import type { Role } from "~/types/role";

const savePerson = async (name: string, phoneNumber: number, role: Role) => {
    try {
        const response = await $fetch('/api/modifyPersonJson', {
            method: 'POST',
            body: { item: {
                name,
                phoneNumber,
                roles: role    
            } },
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

export { savePerson }