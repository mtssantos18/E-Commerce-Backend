import AppDataSource from "../../data-source";
import { Vehicle } from "../../entities/vehicles.entity";
import AppError from "../../errors/AppError";

const deleteVehicleService = async (vehicleId: string): Promise<boolean> => {
  if (vehicleId.length !== 36) {
    throw new AppError("Invalid id format.");
  }

  const vehicleRepository = AppDataSource.getRepository(Vehicle);

  const vehicleToDelete = await vehicleRepository.findOneBy({ id: vehicleId });

  if (!vehicleToDelete) {
    throw new AppError("Vehicle not found.", 404);
  }

  await vehicleRepository.delete({ id: vehicleId });

  return true;
};

export default deleteVehicleService;
