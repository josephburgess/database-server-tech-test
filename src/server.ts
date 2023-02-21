import express from 'express';
import { Request, Response, NextFunction } from 'express';

export function createServer(): express.Express {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.locals.memory = {};

  app.put('/set', (req: Request, res: Response) => {
    return res.status(204).end();
  });

  return app;
}
