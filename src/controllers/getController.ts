import { Request, Response } from 'express';

interface Memory {
  [key: string]: string;
}

export function getController(req: Request, res: Response): void {
  const memory: Memory = req.app.locals.memory;
  const key = req.query.key as string;
  const value = key && key in memory ? memory[key] : undefined;
  const message = value ? 'OK' : `Key '${key}' not found`;
  const status = value ? 200 : key ? 404 : 400;
  const responseMessage = status === 400 ? 'Bad request' : message;
  res.status(status).json({ message: responseMessage, value });
}
