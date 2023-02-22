import express from 'express';
import { Router } from 'express';
import { getController } from '../controllers/getController';

export const getRouter: Router = express.Router();

getRouter.get('/', getController);
