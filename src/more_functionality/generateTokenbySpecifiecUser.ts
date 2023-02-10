// all required imports
import { UserType } from './../types/types';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

export function generateTokenBySpecificUser(u: UserType): string {
  // sign a token for the user "u"
  return jwt.sign({ u }, SECRET_KEY as string);
}
