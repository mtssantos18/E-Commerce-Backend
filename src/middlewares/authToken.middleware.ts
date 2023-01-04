import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      fullName: decoded.fullName,
      email: decoded.email,
      cpf: decoded.cpf,
      id: decoded.sub,
      isSeller: decoded.isSeller,
    };

    return next();
  });
};

export default authTokenMiddleware;
