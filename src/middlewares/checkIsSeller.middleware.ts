import { NextFunction, Request, Response } from "express";

const checkIsSellerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isSeller } = req.user;

  if (!isSeller) {
    return res.status(403).json({ message: "You must be a seller" });
  }

  next();
};

export default checkIsSellerMiddleware;
