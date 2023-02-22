import { app } from '../../server';
import request, { Response } from 'supertest';

describe('getController', () => {
  beforeAll(() => {});

  describe('without a query parameter', () => {
    let response: Response;
    beforeEach(async () => {
      response = await request(app).get('/get');
    });

    it('responds with status 400', () => {
      expect(response.status).toEqual(400);
    });

    it('responds with bad request', () => {
      expect(response.body.message).toEqual('Bad request');
    });
  });
});
