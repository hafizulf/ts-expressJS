import { Request, Response, NextFunction } from 'express';
import Auth from '../utils/Authentication';
import ResponseUtility from '../utils/ResponseUtility';

export const isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!req.headers.authorization) {
    return ResponseUtility.unauthorized(res, 'Token is required');
  }

  try {
    const token: string = req.headers.authorization.split(' ')[1];
    const credential = Auth.verifyToken(token);

    req.app.locals.credential = credential;
    return next();
  } catch (error) {
    return ResponseUtility.unauthorized(res, 'Token is invalid');
  }
};
