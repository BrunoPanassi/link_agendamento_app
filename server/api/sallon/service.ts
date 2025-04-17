import { SallonService } from "~/services/SallonService";

const service = new SallonService();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const method = event.node.req.method

    if (method == 'PATCH') {
        const { id, services } = body;
        return await service.updateSallonServices(id, services);
    }

    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
})