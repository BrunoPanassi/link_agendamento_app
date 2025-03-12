import { ProfessionalService } from "~/services/ProfessionalService";

const service = new ProfessionalService();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const method = event.node.req.method

    if (method == 'PATCH') {
        const { id, sallonIds } = body;
        return await service.updateProfessionalSallons(id, sallonIds);
    }

    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
