import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError("Invalid email or password.", 403);
  }

  const checkPassword = await compare(password, user.password);

  if (!checkPassword) {
    throw new AppError("Invalid email or password.", 403);
  }

  const token = jwt.sign(
    {
      fullName: user.fullName,
      email: user.email,
      cpf: user.cpf,
      isSeller: user.isSeller,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "5h",
    }
  );

  return { userId: user.id, isSeller: user.isSeller, token };
};

export default createSessionService;
