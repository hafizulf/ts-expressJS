import Authentication from '../utils/Authentication';
const db = require('../db/models');

class AuthService {
  register = async ({
    name,
    username,
    email,
    password,
  }: {
    name: string;
    username: string;
    email: string;
    password: string;
  }): Promise<void> => {
    const hashedPassword = await Authentication.hash(password);

    await db.user.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
  };
}

export default new AuthService();
