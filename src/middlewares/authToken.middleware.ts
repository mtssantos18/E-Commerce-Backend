import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token.", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError("Invalid token.", 401);
      }

      req.user = {
        fullName: decoded.fullName,
        email: decoded.email,
        cpf: decoded.cpf,
        isSeller: decoded.isSeller,
      };

      next();
    }
  );
};

export default authTokenMiddleware;
