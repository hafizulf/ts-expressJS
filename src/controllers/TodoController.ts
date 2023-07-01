import { Request, Response } from 'express';
import IController from './IController';
import TodoService from '../services/TodoService';
import ResponseUtility from '../utils/ResponseUtility';

class TodoController implements IController {
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = {
        user_id: req.app.locals.credential.userId,
        description: req.body.description,
      };

      await TodoService.create(data);

      return ResponseUtility.created(res, 'Todo created successfully');
    } catch (error: any) {
      return ResponseUtility.internalServerError(res, error.message);
    }
  };

  findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user_id = req.app.locals.credential.userId;
      const todos = await TodoService.findAll(user_id);

      return ResponseUtility.ok(res, todos);
    } catch (error: any) {
      return ResponseUtility.internalServerError(res, error.message);
    }
  };

  findOne(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  update(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  delete(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}

export default new TodoController();
