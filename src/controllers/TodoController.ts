import { Request, Response } from 'express';
import TodoService from '../services/TodoService';

class TodoController {
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = {
        user_id: req.app.locals.credential.userId,
        description: req.body.description,
      };

      await TodoService.create(data);

      return res.status(201).json({
        status: 'CREATED',
        message: 'Todo created successfully',
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'INTERNAL SERVER ERROR',
        error: error.message,
      });
    }
  };

  findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user_id = req.app.locals.credential.userId;
      const todos = await TodoService.findAll(user_id);

      return res.status(200).json({
        status: 'OK',
        data: todos,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'INTERNAL SERVER ERROR',
        error: error.message,
      });
    }
  };
}

export default new TodoController();