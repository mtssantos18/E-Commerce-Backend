import AppDataSource from "../../data-source";
import { Vehicle } from "../../entities/vehicles.entity";
import AppError from "../../errors/AppError";

const listSpecificVehicleService = async (
  vehicleId: string
): Promise<Vehicle> => {
  if (vehicleId.length !== 36) {
    throw new AppError("Invalid id format.");
  }
  const vehicleRepository = AppDataSource.getRepository(Vehicle);

  const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });

  if (!vehicle) {
    throw new AppError("Vehicle not found.", 404);
  }

  return vehicle;
};

export default listSpecificVehicleService;
