import AppDataSource from "../../data-source";
import { Motorcycle } from "../../entities/motorcycles.entity";
import AppError from "../../errors/AppError";

const listSpecificMotorcycleService = async (motorcycleId: string) => {
  if (motorcycleId.length !== 36) {
    throw new AppError("Invalid id format.");
  }

  const motorcycleRepository = AppDataSource.getRepository(Motorcycle);

  const motorcycle = await motorcycleRepository.findOneBy({ id: motorcycleId });

  if (!motorcycle) {
    throw new AppError("Motorcycle not found.", 404);
  }

  return motorcycle;
};

export default listSpecificMotorcycleService;
