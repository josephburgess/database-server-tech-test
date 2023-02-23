import request from 'supertest';
import { app, start } from '../server';
import { Server } from 'http';

describe('GET /', () => {
  let server: Server;

  beforeAll(async () => {
    server = start();
  });

  afterAll(async () => {
    server.close();
  });

  it('responds with a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Welcome to the server! Use the PUT /set and GET /get endpoints to store and retrieve key/value pairs in the memory.'
    );
  });
});
