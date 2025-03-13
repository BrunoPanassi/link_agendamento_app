import { ManagerService } from "~/services/ManagerService";

const service = new ManagerService()

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const method = event.node.req.method

    if (method == 'PATCH') {
        const { id, sallonIds } = body;
        return await service.updateManagerSallons(id, sallonIds);
    }

    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});