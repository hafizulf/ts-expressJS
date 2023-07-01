import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import ResponseUtility from '../utils/ResponseUtility';

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      await AuthService.register(req.body);

      return ResponseUtility.created(res, 'User created successfully');
    } catch (error: any) {
      return ResponseUtility.internalServerError(res, error.message);
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
      if (error.msg) return ResponseUtility.badRequest(res, error.msg);
      return ResponseUtility.internalServerError(res, error.message);
    }
  };
}

export default new AuthController();
