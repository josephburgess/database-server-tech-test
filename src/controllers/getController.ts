import { Request, Response } from 'express';

interface Memory {
  [key: string]: string;
}

export function getController(req: Request, res: Response): void {
  res.status(400).json({ message: 'Bad request' });
}
