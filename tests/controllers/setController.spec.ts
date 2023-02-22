import { Request, Response } from 'express';
import { setController } from '../../src/controllers/setController';

describe('setController', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      query: {},
      app: {
        locals: {
          memory: {},
        },
      } as any,
    } as any;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;
  });

  describe('when a key and value are provided', () => {
    beforeEach(() => {
      req.query = { name: 'Foo' };
      setController(req, res);
    });

    it('should store the key and value in memory', () => {
      expect(req.app.locals.memory).toEqual({ name: 'Foo' });
    });

    it('should return a status of 201', () => {
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should return a confirmation message', () => {
      expect(res.json).toHaveBeenCalledWith({ message: 'OK' });
    });
  });

  describe('when a key or value is missing', () => {
    beforeEach(() => {
      req.query = {};
      setController(req, res);
    });

    it('should not store anything in memory', () => {
      expect(req.app.locals.memory).toEqual({});
    });

    it('should return a status of 204', () => {
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should return an error message', () => {
      expect(res.json).toHaveBeenCalledWith({ message: 'No query specified' });
    });
  });
});
