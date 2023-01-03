import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";
import listUsersService from "../services/users/listUsers.service";
import listSpecificUserService from "../services/users/listSpecificUser.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import updateAddressService from "../services/users/updateAddress.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(instanceToPlain(newUser));
};

export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.status(200).json(instanceToPlain(users));
};

export const listSpecificUserController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;

  const user = await listSpecificUserService(userId);

  return res.status(200).json(instanceToPlain(user));
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body;

  const { userId } = req.params;

  const updateUser = await updateUserService(userData, userId);

  return res.status(200).json(instanceToPlain(updateUser));
};

export const updateUserAddressController = async (
  req: Request,
  res: Response
) => {
  const addressData = req.body;
  const { userId } = req.params;

  const updateAddress = await updateAddressService(addressData, userId);

  return res.status(200).json(instanceToPlain(updateAddress));
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const deleteUser = await deleteUserService(userId);

  return res.status(204).json(deleteUser);
};
