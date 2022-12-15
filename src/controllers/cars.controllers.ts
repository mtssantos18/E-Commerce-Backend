import { Request, Response } from "express";
import { ICarRequest, ICarUpdateRequest } from "../interfaces/cars";
import createCarService from "../services/cars/createCar.service";
import deleteCarService from "../services/cars/deleteCar.service";
import listCarsService from "../services/cars/listCars.service";
import updateCarService from "../services/cars/updateCar.service";

export const createCarController = async (req: Request, res: Response) => {
  const carData: ICarRequest = req.body;

  const newCar = await createCarService(carData);

  return res.status(201).json(newCar);
};

export const listCarsController = async (req: Request, res: Response) => {
  const cars = await listCarsService();

  return res.status(200).json(cars);
};

export const updateCarController = async (req: Request, res: Response) => {
  const { carId } = req.params;

  const carData: ICarUpdateRequest = req.body;

  const updateCar = await updateCarService(carId, carData);

  return res.status(200).json(updateCar);
};

export const deleteCarController = async (req: Request, res: Response) => {
  const { carId } = req.params;

  const deletedCar = await deleteCarService(carId);

  return res.status(204).json(deletedCar);
};
