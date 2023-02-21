import request from 'supertest';
import { createServer } from '../src/server';

describe('server', () => {
  const app = createServer();

  it('should set a key value pair', async () => {
    const setResponse = await request(app)
      .put('/set')
      .query({ key: 'value' })
      .expect(201);
  });

  it('should get a key value pair', async () => {
    const setResponse = await request(app)
      .get('/get')
      .query({ key: 'somekey' })
      .expect(200);

    expect(setResponse.text).toBe('The value of key somekey is somevalue');
  });
});
