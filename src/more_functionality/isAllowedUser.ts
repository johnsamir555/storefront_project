// all required imports
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const { SECRET_KEY } = process.env;

function isAllowedUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // get the value of Authorization in the request
    const existAuth = request.get('Authorization') as unknown as string;

    if (!existAuth) {
      response
        .status(401)
        .send('<h2>Access Denied .. There is no token to verify</h2>');
      return;
    } else {
      // remove token prefix
      const actualToken: string = existAuth.split(' ')[1];
      // verify token
      const verifiedToken = jwt.verify(actualToken, SECRET_KEY as string);
      if (verifiedToken) {
        next();
      } else {
        response.json({
          status: 'failed',
          message:
            'Failed to authenticate this user according the request token..',
        });
      }
    }
  } catch (error) {
    response.status(401).json({
      status: 'error',
      message: `Couldn't process your request due this error:${error}`,
    });
  }
}

export default isAllowedUser;
