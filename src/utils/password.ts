import { compare, hash } from 'bcrypt';

export const createPassWordHash = async (password: string): Promise<string> => {
  const salt = 10;
  return await hash(password, salt);
};

export const validatePassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return compare(password, passwordHash);
};
