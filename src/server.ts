import express from 'express';
import { Request, Response, NextFunction } from 'express';

export function createServer(): express.Express {
  const app = express();
  app.locals.memory = {};
  app.use(express.urlencoded({ extended: true }));

  app.put('/set', (req: Request, res: Response) => {
    if (Object.keys(req.query).length === 0) {
      return res.status(204).send();
    } else {
      return res.status(201).send();
    }
  });

  return app;
}
