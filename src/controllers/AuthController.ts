import { Request, Response } from 'express';

class AuthController {
  register(req: Request, res: Response): Response {
    return res.json(req.body);
  }

  login(req: Request, res: Response): Response {
    return res.send('Login Page!');
  }
}

export default new AuthController();
