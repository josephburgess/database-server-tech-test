import { app } from '../../server';
import request, { Response } from 'supertest';

describe('getController', () => {
  let response: Response;

  describe('without a query parameter', () => {
    it('responds with status 400', async () => {
      response = await request(app).get('/get');
      expect(response.status).toEqual(400);
    });

    it('responds with bad request', async () => {
      response = await request(app).get('/get');
      expect(response.body.message).toEqual('Bad request');
    });
  });
  describe('without a key parameter', () => {
    it('responds with status 400', async () => {
      response = await request(app).get('/get?name=foo');
      expect(response.status).toEqual(400);
    });

    it('responds with bad request', async () => {
      response = await request(app).get('/get?name=foo');
      expect(response.body.message).toEqual('Bad request');
    });
  });

  describe('a key query parameter', () => {
    beforeEach(() => {
      app.locals.memory = { name: 'Foo', occupation: 'Bar' };
    });

    describe('when the key exists in memory', () => {
      it('responds with status 200', async () => {
        response = await request(app).get('/get?key=name');
        expect(response.status).toEqual(200);
      });
      it('responds with the value of the key', async () => {
        response = await request(app).get('/get?key=name');
        expect(response.body.message).toEqual('Foo');
      });
    });
  });
});
