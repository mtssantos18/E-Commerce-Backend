import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IAddressUpdateRequest } from "../../interfaces/users";

const updateAddressService = async (
  { city, complement, number, state, street, zipCode }: IAddressUpdateRequest,
  userId: string
) => {
  if (userId.length !== 36) {
    throw new AppError("Invalid id format.", 400);
  }

  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  await addressRepository.update(user.address.id, {
    city: city ? city : user.address.city,
    complement: complement ? complement : user.address.complement,
    number: number ? number : user.address.number,
    state: state ? state : user.address.state,
    street: street ? street : user.address.street,
    zipCode: zipCode ? zipCode : user.address.zipCode,
  });

  const updatedUserAddress = await userRepository.findOneBy({ id: userId });

  return updatedUserAddress;
};

export default updateAddressService;
