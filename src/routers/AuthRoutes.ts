import { Router } from 'express';
import IRouter from './IRouter';
import registerValidate from '../middleware/RegisterValidator';
import loginValidate from '../middleware/LoginValidator';
import AuthController from '../controllers/AuthController';

class AuthRoutes implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router.post('/register', registerValidate, AuthController.register);
    this.router.post('/login', loginValidate, AuthController.login);
  }
}

export default new AuthRoutes().router;
