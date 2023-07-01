import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
  public static hash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  };

  public static compare = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);

    return comparedPassword;
  };

  public static generateToken = (payload: any): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });

    return token;
  };
}

export default Authentication;
