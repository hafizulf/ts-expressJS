const db = require('../db/models');

class TodoService {
  create = async ({
    user_id,
    description,
  }: {
    user_id: number;
    description: string;
  }): Promise<void> => {
    await db.todo.create({ user_id, description, status: 1 });
  };
}

export default new TodoService();
