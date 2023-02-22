import { Request, Response } from 'express';

interface Memory {
  [key: string]: string;
}

export function setController(req: Request, res: Response) {
  if (Object.keys(req.query).length === 0) {
    return res.status(204).json({ message: 'No query specified' });
  } else {
    Object.assign(req.app.locals.memory, req.query);
    return res.status(201).json({ message: 'OK' });
  }
}
