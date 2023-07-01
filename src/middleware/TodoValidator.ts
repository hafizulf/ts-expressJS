import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ResponseUtility from '../utils/ResponseUtility';

class TodoValidator {
  validate: any[];

  constructor() {
    this.validate = [
      check('description')
        .notEmpty()
        .withMessage('is required')
        .isString()
        .withMessage('must be a string'),
      (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
          const errorMessage: any = [];

          error.array({ onlyFirstError: true }).map((e) => {
            errorMessage.push(`${(<any>e).path}: ${e.msg}`);
          });

          return ResponseUtility.badRequest(res, errorMessage);
        }

        return next();
      },
    ];
  }
}

export default new TodoValidator().validate;
