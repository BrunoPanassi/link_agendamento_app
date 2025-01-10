import type { Admin } from "~/types/admin";

const saveAdmin = async (personId: number, email: string, password: string) => {
    try {
        const response = await $fetch('/api/admin', {
            method: 'POST',
            body: { item: {
                personId,
                email,
                password
            } },
        });
        if (response.success)
            return response.data as Admin
        return null
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar uma pessoa"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    }
}

export { saveAdmin }