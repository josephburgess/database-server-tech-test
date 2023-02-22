import { app } from '../server';
import request, { Response } from 'supertest';
import express from 'express';
import { setController } from '../src/controllers/setController';

describe('server', () => {
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

    it('updates the app memory with both queries', () => {
      expect(app.locals.memory).toEqual({ name: 'Foo', occupation: 'Bar' });
    });
    describe('with a second request', () => {
      it('can update a single key', async () => {
        response = await request(app).put('/set?name=Bar');
        expect(app.locals.memory).toEqual({ name: 'Bar', occupation: 'Bar' });
      });
      it('can update one key and add a new one', async () => {
        response = await request(app).put('/set?name=Bar&hobby=FooBar');
        expect(app.locals.memory).toEqual({
          name: 'Bar',
          occupation: 'Bar',
          hobby: 'FooBar',
        });
      });
      it('can add several new keys', async () => {
        response = await request(app).put(
          '/set?fruit=Apple&city=Tokyo&instrument=Guitar'
        );
        expect(app.locals.memory).toEqual({
          name: 'Foo',
          occupation: 'Bar',
          fruit: 'Apple',
          city: 'Tokyo',
          hobby: 'FooBar',
          instrument: 'Guitar',
        });
      });
    });
  });
});
