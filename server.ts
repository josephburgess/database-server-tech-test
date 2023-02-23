import express from 'express';
import { setRouter } from './src/routes/setRouter';
import { getRouter } from './src/routes/getRouter';
import { indexRouter } from './src/routes/indexRouter';
const port = 4000;

export const app = express();

app.use(express.urlencoded({ extended: true }));

app.locals.memory = {};

app.use('/set', setRouter);
app.use('/get', getRouter);
app.use('/', indexRouter);

export function start() {
  return app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  start();
}
