import { Request, Response } from 'express';
import TodoService from '../services/TodoService';
import ResponseUtility from '../utils/ResponseUtility';

class TodoController {
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
}

export default new TodoController();
