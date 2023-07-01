import BaseRoutes from './BaseRoutes';
import registerValidate from '../middleware/RegisterValidator';
import loginValidate from '../middleware/LoginValidator';
import AuthController from '../controllers/AuthController';

class AuthRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/register', registerValidate, AuthController.register);
    this.router.post('/login', loginValidate, AuthController.login);
  }
}

export default new AuthRoutes().router;
