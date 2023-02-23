import express from 'express';
import { Router } from 'express';
import { indexController } from '../controllers/indexController';

export const indexRouter: Router = express.Router();

indexRouter.get('/', indexController);
