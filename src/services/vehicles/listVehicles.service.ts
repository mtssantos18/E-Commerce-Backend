import AppDataSource from "../../data-source";
import { Vehicle } from "../../entities/vehicles.entity";

const listVehiclesService = async (): Promise<Vehicle[]> => {
  const carRepository = AppDataSource.getRepository(Vehicle);

  const cars = await carRepository.find({
    relations: { user: true },
  });

  return cars;
};

export default listVehiclesService;
