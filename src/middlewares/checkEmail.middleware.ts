import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";

const checkEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const email = req.body.email;

  if (email) {
    const emailCheck = await userRepository.findOneBy({ email });

    if (emailCheck) {
      return res.status(400).json({ message: "This email already exist." });
    }
  }

  next();
};

export default checkEmailMiddleware;
