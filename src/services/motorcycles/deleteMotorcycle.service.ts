import AppDataSource from "../../data-source";
import { Motorcycle } from "../../entities/motorcycles.entity";
import AppError from "../../errors/AppError";

const deleteMotorcycleService = async (
  motorcycleId: string
): Promise<boolean> => {
  const motorCycleRepository = AppDataSource.getRepository(Motorcycle);

  const motorcycleToDelete = await motorCycleRepository.findOneBy({
    id: motorcycleId,
  });

  if (!motorcycleToDelete) {
    throw new AppError("Motorcycle not found.", 404);
  }

  await motorCycleRepository.delete({ id: motorcycleId });

  return true;
};

export default deleteMotorcycleService;
