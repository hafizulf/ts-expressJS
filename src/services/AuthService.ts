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

  login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<any> => {
    const user = await db.user.findOne({
      where: { username },
    });
    if (!user) throw { msg: 'User not found' };

    const comparedPassword = await Authentication.compare(
      password,
      user.password
    );
    if (!comparedPassword) throw { msg: 'Invalid password' };

    const token = Authentication.generateToken({
      userId: user.id,
      username: user.username,
      email: user.email,
    });
    return token;
  };
}

export default new AuthService();
