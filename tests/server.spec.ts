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

    it('updates the app memory', () => {
      expect(app.locals.memory).toEqual({ name: 'Foo' });
    });

    describe('with a second request', () => {
      it('changes nothing with an empty request', async () => {
        response = await request(app).put('/set');
        expect(app.locals.memory).toEqual({ name: 'Foo' });
      });
      it('should not change anything when sending the same request', async () => {
        response = await request(app).put('/set?name=Foo');
        expect(app.locals.memory).toEqual({ name: 'Foo' });
      });
      it('should replace original query if sent the same key with new value', async () => {
        response = await request(app).put('/set?name=Bar');
        expect(app.locals.memory).toEqual({ name: 'Bar' });
      });
      it('should add a second key value pair with a new key in the query', async () => {
        response = await request(app).put('/set?occupation=Bar');
        expect(app.locals.memory).toEqual({ name: 'Foo', occupation: 'Bar' });
      });
    });
  });

  describe('with two query parameters', () => {
    let response: Response;

    beforeEach(async () => {
      response = await request(app).put('/set?name=Foo&occupation=Bar');
    });

    it('responds with status 201', () => {
      expect(response.status).toEqual(201);
    });
    it('responds with a confirmation message', () => {
      expect(response.body.message).toEqual('OK');
    });

    it('updates the app memory', () => {
      expect(app.locals.memory).toEqual({ name: 'Foo', occupation: 'Bar' });
    });
  });
});
