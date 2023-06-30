import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config as dotenv } from 'dotenv';

import AuthRoutes from './routers/AuthRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  plugins(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(morgan('dev'));
  }

  routes(): void {
    this.app.route('/api/v1/').get((req: Request, res: Response): Response => {
      return res.send('TypeScript ExpressJS!');
    });

    this.app.use('/api/v1/auth', AuthRoutes);
  }
}

const app = new App().app;
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
