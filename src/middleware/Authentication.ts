import { Request, Response, NextFunction } from 'express';
import Auth from '../utils/Authentication';

export const isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: 'UNAUTHORIZED',
      error: 'Token is not provided!',
    });
  }

  try {
    const token: string = req.headers.authorization.split(' ')[1];
    const credential = Auth.verifyToken(token);

    req.app.locals.credential = credential;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: (<any>error).message,
    });
  }
};
