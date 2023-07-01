import BaseRoutes from './BaseRoutes';

class TodoRoutes extends BaseRoutes {
  routes(): void {
    throw new Error('Method not implemented.');
  }
}

export default new TodoRoutes().router;
