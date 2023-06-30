import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

class App {
  public app: Application;

  constructor() {
    this.app = express();
  }
}

const app = new App().app;

app.listen(8000, () => {
  console.log('Running on port 8000');
});
