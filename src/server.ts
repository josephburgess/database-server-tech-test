import express from 'express';
import { setController } from './controllers/setController';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.locals.memory = {};

app.put('/set', setController);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
