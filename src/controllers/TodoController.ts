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

  findOne = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user_id = req.app.locals.credential.userId;
      const todo_id = parseInt(req.params.id);

      const todo = await TodoService.findOne(user_id, todo_id);

      return ResponseUtility.ok(res, todo);
    } catch (error: any) {
      return ResponseUtility.internalServerError(res, error.message);
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const user_id = req.app.locals.credential.userId;
    const todo_id = parseInt(req.params.id);

    try {
      await TodoService.update(user_id, todo_id, req.body);

      return ResponseUtility.ok(res, 'Todo updated successfully');
    } catch (error: any) {
      if (error.msg) return ResponseUtility.badRequest(res, error.msg);
      return ResponseUtility.internalServerError(res, error.message);
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    throw new Error('Method not implemented.');
  };
}

export default new TodoController();
