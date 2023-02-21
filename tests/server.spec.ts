import { Application } from 'express';
import request, { Response } from 'supertest';
import { createServer } from '../src/server';

describe('server', () => {
  let app: Application;

  beforeAll(() => {
    app = createServer();
  });

  describe('without a query parameter', () => {
    let response: Response;
    beforeEach(async () => {
      response = await request(app).put('/set');
    });

    it('responds with status 204', () => {
      expect(response.status).toEqual(204);
    });

    it('has no body', () => {
      expect(response.body).toEqual({});
    });

    it('does nothing to memory', () => {
      expect(app.locals.memory).toEqual({});
    });
  });

  describe('with one query parameter', () => {
    let response: Response;

    beforeEach(async () => {
      response = await request(app).put('/set?name=Foo');
    });

    it('responds with status 201', () => {
      expect(response.status).toEqual(201);
    });
    it('responds with a confirmation message', () => {
      expect(response.body.message).toEqual('OK');
    });
  });
});
