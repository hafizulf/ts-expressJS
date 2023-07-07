import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config as dotenv } from 'dotenv';

import validUrl from 'valid-url';
const db = require('./db/models');

import AuthRoutes from './routers/AuthRoutes';
import TodoRoutes from './routers/TodoRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(morgan('dev'));
  }

  routes(): void {
    this.app.route('/api/v1/').get((req: Request, res: Response): Response => {
      return res.send('TypeScript ExpressJS!');
    });

    this.app
      .route('/api/url-shortener')
      .post(async (req: Request, res: Response): Promise<Response> => {
        const url = req.body.url;

        // Check if URL is valid
        if (!validUrl.isUri(url)) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid URL',
          });
        }

        // Generate a unique alias
        let alias = this.generateUniqueAlias();
        const urlData = await db.url.findOne({ where: { aliases: alias } });
        while (urlData) {
          alias = this.generateUniqueAlias();
        }

        // Save to database
        await db.url.create({ url, aliases: alias });

        return res.status(200).json({
          status: 'success',
          message: 'URL successfully shortened',
          url: `http://localhost:3000/${alias}`,
        });
      });

    this.app
      .route('/:alias')
      .get(async (req: Request, res: Response): Promise<Response> => {
        const { alias } = req.params;

        const urlData = await db.url.findOne({ where: { aliases: alias } });
        if (!urlData) {
          return res.status(400).json({
            status: 'error',
            message: 'URL not found',
          });
        }

        return res.json({
          status: 'success',
          message: 'URL successfully retrieved',
          url: urlData.url,
        });
      });

    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/todos', TodoRoutes);
  }

  generateUniqueAlias = (): string => {
    return Math.random().toString(36).substring(2, 7);
  };
}

const app = new App().app;
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
