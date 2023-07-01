import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

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
          const errrorMessage: any = [];

          error.array({ onlyFirstError: true }).map((e) => {
            errrorMessage.push(`${(<any>e).path}: ${e.msg}`);
          });

          return res.status(404).json({
            status: 'BAD REQUEST',
            error: errrorMessage,
          });
        }

        return next();
      },
    ];
  }
}

export default new TodoValidator().validate;
