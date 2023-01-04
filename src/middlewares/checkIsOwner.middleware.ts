import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Vehicle } from "../entities/vehicles.entity";

const checkIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { vehicleId } = req.params;

  const vehicleRepository = AppDataSource.getRepository(Vehicle);

  const vehicle = await vehicleRepository.findOneOrFail({
    where: { id: vehicleId },
    relations: { user: true },
  });

  const userLoggedId = req.user.id;

  const vehicleOwnerId = vehicle.user.id;

  if (userLoggedId === vehicleOwnerId) {
    return next();
  }

  return res
    .status(401)
    .json({ message: "You must be owner to manage this vehicle." });
};

export default checkIsOwnerMiddleware;
