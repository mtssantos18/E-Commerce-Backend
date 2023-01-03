import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IAddressRequest, IUserRequest } from "../../interfaces/users";

const createUserService = async ({
  address,
  birthDate,
  cellPhone,
  cpf,
  email,
  fullName,
  isSeller,
  password,
  description,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  if (address.state.length > 2) {
    throw new AppError("State must have 2 letters.", 400);
  }

  if (fullName.length > 128) {
    throw new AppError("Full name cannot be bigger than 128 characters.", 400);
  }

  if (email.length > 128) {
    throw new AppError("Email cannot be bigger than 128 characters.", 400);
  }

  const addressObj: IAddressRequest = {
    city: address.city,
    number: address.number,
    state: address.state,
    street: address.street,
    zipCode: address.zipCode,
    complement: address.complement,
  };

  const newAddress = addressRepository.create(addressObj);

  await addressRepository.save(newAddress);

  const hashedPassword = await hash(password, 10);

  const newUser = userRepository.create({
    address: newAddress,
    birthDate,
    cellPhone,
    cpf,
    description,
    email,
    fullName,
    isSeller,
    password: hashedPassword,
  });

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
