import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

const deleteUserService = async (userId: string): Promise<boolean> => {
  if (userId.length !== 36) {
    throw new AppError("Invalid id format.", 400);
  }

  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const checkUser = await userRepository.findOneBy({ id: userId });

  if (!checkUser) {
    throw new AppError("User not found.", 404);
  }

  await addressRepository.delete({ id: checkUser.address.id });

  return true;
};

export default deleteUserService;
