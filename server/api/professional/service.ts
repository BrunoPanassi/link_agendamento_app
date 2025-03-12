import { ProfessionalService } from "~/services/ProfessionalService";

const service = new ProfessionalService();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const method = event.node.req.method

    if (method == 'PATCH') {
        const { id, serviceIds } = body;
        return await service.updateProfessionalServices(id, serviceIds);
    }

    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
