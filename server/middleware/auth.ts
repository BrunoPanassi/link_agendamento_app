export default defineEventHandler((event) => {
    const userId = getCookie(event, "user_id");
    const securityKey = getCookie(event, "security_key");
    if (!(userId && securityKey)) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
          });
    }
  })
  