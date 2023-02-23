import { Request, Response } from 'express';

interface Memory {
  [key: string]: string;
}

export function setController(req: Request, res: Response): void {
  const memory: Memory = req.app.locals.memory;
  const query = req.query;
  if (Object.keys(query).length === 0) {
    res.status(204).json({ message: 'No query specified' });
    return;
  } else {
    Object.assign(memory, query);
    res.status(201).json({ message: 'OK' });
    return;
  }
}
