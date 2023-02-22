import express from 'express';
import { setRouter } from './src/routes/setRouter';
import { getRouter } from './src/routes/getRouter';
const port = 4000;

export const app = express();

app.use(express.urlencoded({ extended: true }));

app.locals.memory = {};

app.use('/set', setRouter);
app.use('/get', getRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
