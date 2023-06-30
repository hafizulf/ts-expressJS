import express, { Application } from 'express';
import { config as dotenv } from 'dotenv';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    dotenv();
  }
}

const app = new App().app;
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
