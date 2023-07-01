import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      await AuthService.register(req.body);

      return res.status(201).json({
        status: 'CREATED',
        message: 'User created successfully',
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'INTERNAL SERVER ERROR',
        error: error.message,
      });
    }
  };

  login(req: Request, res: Response): Response {
    return res.send('Login Page!');
  }
}

export default new AuthController();
