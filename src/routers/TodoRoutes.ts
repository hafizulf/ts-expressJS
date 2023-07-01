import BaseRoutes from './BaseRoutes';
import { isLoggedIn } from '../middleware/Authentication';
import TodoController from '../controllers/TodoController';

class TodoRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/', isLoggedIn, TodoController.create);
  }
}

export default new TodoRoutes().router;
