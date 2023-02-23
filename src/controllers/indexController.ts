import { Request, Response } from 'express';

export function indexController(req: Request, res: Response): void {
  res.status(200).json({
    message:
      'Welcome to the server! Use the PUT /set and GET /get endpoints to store and retrieve key/value pairs in the memory.',
  });
}
