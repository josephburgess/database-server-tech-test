import express from 'express';
import { Router } from 'express';
import { setController } from '../controllers/setController';

export const setRouter: Router = express.Router();

setRouter.put('/', setController);
