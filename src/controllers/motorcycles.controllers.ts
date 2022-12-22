import { Request, Response } from "express";
import { IMotorcycleRequest } from "../interfaces/motorcycles";
import createMotorcycleService from "../services/motorcycles/createMotorcycle.service";
import deleteMotorcycleService from "../services/motorcycles/deleteMotorcycle.service";
import listMotorcyclesService from "../services/motorcycles/listMotorcycles.service";
import listSpecificMotorcycleService from "../services/motorcycles/listSpecificMotorcycle.service";
import updateMotorcycleService from "../services/motorcycles/updateMotorcycle.service";

export const createMotorcycleController = async (
  req: Request,
  res: Response
) => {
  const motorcycleData: IMotorcycleRequest = req.body;

  const newMotorcycle = await createMotorcycleService(motorcycleData);

  return res.status(201).json(newMotorcycle);
};

export const listMotorcyclesController = async (
  req: Request,
  res: Response
) => {
  const motorcycles = await listMotorcyclesService();

  return res.status(200).json(motorcycles);
};

export const listSpecificMotorcycleController = async (
  req: Request,
  res: Response
) => {
  const { motorcycleId } = req.params;

  const motorcycle = await listSpecificMotorcycleService(motorcycleId);

  return res.status(200).json(motorcycle);
};

export const updateMotorcycleController = async (
  req: Request,
  res: Response
) => {
  const { motorcycleId } = req.params;

  const motorcycleData = req.body;

  const updateMotorcycle = await updateMotorcycleService(
    motorcycleId,
    motorcycleData
  );

  return res.status(200).json(updateMotorcycle);
};

export const deleteMotorcycleController = async (
  req: Request,
  res: Response
) => {
  const { motorcycleId } = req.params;

  const deletedMotorcycle = await deleteMotorcycleService(motorcycleId);

  return res.status(204).json(deletedMotorcycle);
};
