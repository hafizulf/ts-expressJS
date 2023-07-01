import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

class AuthValidator {
  validate: any[];

  constructor() {
    this.validate = [
      check('name')
        .notEmpty()
        .withMessage('is required')
        .isString()
        .withMessage('must be a string'),
      check('username')
        .notEmpty()
        .withMessage('is required')
        .isString()
        .withMessage('must be a string'),
      check('email')
        .notEmpty()
        .withMessage('is required')
        .isEmail()
        .withMessage('must be valid'),
      check('password')
        .notEmpty()
        .withMessage('is required')
        .isLength({ min: 6 })
        .withMessage('length minimum is 6'),
      (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
          let errorMessage: any[] = [];

          error.array({ onlyFirstError: true }).map((e) => {
            errorMessage.push(`${(<any>e).path}: ${e.msg}`);
          });

          return res.status(404).json({
            status: 'BAD REQUEST',
            error: errorMessage,
          });
        }

        return next();
      },
    ];
  }
}

export default new AuthValidator().validate;
