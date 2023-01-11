import { Request, Response } from "express";
import { IVehicleRequest, IVehicleUpdateRequest } from "../interfaces/vehicles";
import createVehicleService from "../services/vehicles/createVehicle.service";
import listVehiclesService from "../services/vehicles/listVehicles.service";
import listSpecificVehicleService from "../services/vehicles/listSpecificVehicle.service";
import updateVehicleService from "../services/vehicles/updateVehicle.service";
import deleteVehicleService from "../services/vehicles/deleteVehicle.service";
import { instanceToPlain } from "class-transformer";

export const createVehicleController = async (req: Request, res: Response) => {
  const vehicleData: IVehicleRequest = req.body;

  const userId = req.user.id;

  const newVehicle = await createVehicleService(vehicleData, userId);

  return res.status(201).json(newVehicle);
};

export const listVehiclesController = async (req: Request, res: Response) => {
  const vehicles = await listVehiclesService();

  return res.status(200).json(instanceToPlain(vehicles));
};

export const listSpecificVehicleController = async (
  req: Request,
  res: Response
) => {
  const { vehicleId } = req.params;

  const vehicle = await listSpecificVehicleService(vehicleId);

  return res.status(200).json(instanceToPlain(vehicle));
};

export const updateVehicleController = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  const vehicleData: IVehicleUpdateRequest = req.body;

  const updateVehicle = await updateVehicleService(vehicleId, vehicleData);

  return res.status(200).json(updateVehicle);
};

export const deleteVehicleController = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  const deletedVehicle = await deleteVehicleService(vehicleId);

  return res.status(204).json(deletedVehicle);
};
