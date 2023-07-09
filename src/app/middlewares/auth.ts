import { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to access this'
        );
      }

      //verify token
      let verifyUser = null;
      verifyUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      //customize request
      req.user = verifyUser; //userId, role

      //role guard
      if (requiredRoles.length && !requiredRoles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
