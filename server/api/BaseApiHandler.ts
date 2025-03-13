import { H3Event } from 'h3';

export abstract class BaseApiHandler<T> {
  abstract find(event: H3Event): Promise<T | T[] | null | undefined>;
  abstract create(event: H3Event): Promise<T>
  abstract update(event: H3Event): Promise<T | null>;
  abstract delete(event: H3Event): Promise<string>;

  async handle(event: H3Event) {
    switch (event.method) {
      case 'GET':
        return this.find(event);

      case 'POST':
        return this.create(event);

      case 'PATCH':
        return this.update(event);

      case 'DELETE':
        return this.delete(event);

      default:
        throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
    }
  }
}
