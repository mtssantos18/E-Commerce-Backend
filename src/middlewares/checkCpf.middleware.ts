import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";

const checkCpfMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const cpf = req.body.cpf;

  if (cpf) {
    const cpfCheck = await userRepository.findOneBy({ cpf });

    if (cpfCheck) {
      return res.status(400).json({ message: "This CPF already exist." });
    }
  }

  next();
};

export default checkCpfMiddleware;
