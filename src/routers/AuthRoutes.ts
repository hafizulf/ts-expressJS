import { Router } from 'express';
import IRouter from './IRouter';
import validate from '../middleware/AuthValidator';
import AuthController from '../controllers/AuthController';

class AuthRoutes implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router.post('/register', validate, AuthController.register);
    this.router.get('/login', AuthController.login);
  }
}

export default new AuthRoutes().router;