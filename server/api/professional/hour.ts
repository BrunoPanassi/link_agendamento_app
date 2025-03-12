import { ProfessionalService } from "~/services/ProfessionalService";

const service = new ProfessionalService();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const method = event.node.req.method

    if (method == 'PATCH') {
        const { id, hours } = body;
        return await service.updateProfessionalHours(id, hours);
    }

    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
