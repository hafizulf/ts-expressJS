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

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const isLoggedIn = await AuthService.login(req.body);

      return res.status(200).json({
        status: 'OK',
        token: isLoggedIn,
      });
    } catch (error: any) {
      if (error.msg)
        return res.status(400).json({
          status: 'BAD REQUEST',
          error: error.msg,
        });

      return res.status(500).json({
        status: 'INTERNAL SERVER ERROR',
        error: error.message,
      });
    }
  };
}

export default new AuthController();
