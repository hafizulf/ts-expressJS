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

  findAll = async (user_id: number): Promise<any> => {
    const todos = await db.todo.findAll({ where: { user_id } });
    return todos;
  };

  findOne = async (user_id: number, todo_id: number): Promise<any> => {
    const todo = await db.todo.findOne({ where: { user_id, id: todo_id } });
    return todo;
  };
}

export default new TodoService();
