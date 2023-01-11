import { compareSync, hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IUserUpdateRequest } from "../../interfaces/users";

const updateUserService = async (
  {
    address,
    birthDate,
    cellPhone,
    cpf,
    description,
    email,
    fullName,
    isSeller,
    password,
  }: IUserUpdateRequest,
  userId: string
) => {
  if (userId.length !== 36) {
    throw new AppError("Invalid id format", 404);
  }

  if (address) {
    throw new AppError("You cannot update address property.", 400);
  }

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  let newPassword = "";
  if (password) {
    if (compareSync(password, user.password)) {
      throw new AppError("Enter a different password.", 400);
    }
    newPassword = hashSync(password, 10);
  }

  console.log(isSeller);

  await userRepository.update(user!.id, {
    address: user.address,
    birthDate: birthDate ? birthDate : user.birthDate,
    cellPhone: cellPhone ? cellPhone : user.cellPhone,
    cpf: cpf ? cpf : user.cpf,
    description: description ? description : user.description,
    email: email ? email : user.email,
    fullName: fullName ? fullName : user.fullName,
    isSeller: isSeller ? isSeller : user.isSeller,
    password: password ? newPassword : user.password,
  });

  const updatedUser = await userRepository.findOneBy({ id: userId });

  return updatedUser;
};

export default updateUserService;
