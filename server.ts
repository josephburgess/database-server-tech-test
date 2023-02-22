import express from 'express';
import { setRouter } from './src/routes/setRouter';
const port = 4001;

export const app = express();

app.use(express.urlencoded({ extended: true }));

app.locals.memory = {};

app.use('/set', setRouter);

if (!process.env.TEST) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
