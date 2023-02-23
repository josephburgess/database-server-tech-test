import { Request, Response } from 'express';

interface Memory {
  [key: string]: string;
}

export function getController(req: Request, res: Response): void {
  const memory: Memory = req.app.locals.memory;
  const key = req.query.key as string;
  if (!key) {
    res.status(400).json({ message: 'Bad request' });
    return;
  } else if (key in memory) {
    const value = memory[key];
    res.status(200).json({ value, message: 'OK' });
    return;
  } else {
    res.status(404).json({ message: 'Key not found' });
  }
}
