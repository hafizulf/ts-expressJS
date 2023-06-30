import { Request, Response } from 'express';

class AuthController {
  register(req: Request, res: Response): Response {
    return res.send('Register Page!');
  }

  login(req: Request, res: Response): Response {
    return res.send('Login Page!');
  }
}

export default new AuthController();
