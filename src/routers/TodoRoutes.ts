import BaseRoutes from './BaseRoutes';
import { isLoggedIn } from '../middleware/Authentication';
import validate from '../middleware/TodoValidator';
import TodoController from '../controllers/TodoController';

class TodoRoutes extends BaseRoutes {
  routes(): void {
    this.router
      .post('/', isLoggedIn, validate, TodoController.create)
      .get('/', isLoggedIn, TodoController.findAll);
  }
}

export default new TodoRoutes().router;
