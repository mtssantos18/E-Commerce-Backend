import AppDataSource from "../../data-source";
import { Car } from "../../entities/cars.entity";
import AppError from "../../errors/AppError";

const deleteCarService = async (carId: string): Promise<boolean> => {
  if (carId.length !== 36) {
    throw new AppError("Invalid id format.");
  }

  const carRepository = AppDataSource.getRepository(Car);

  const carToDelete = await carRepository.findOneBy({ id: carId });

  if (!carToDelete) {
    throw new AppError("Car not found.", 404);
  }

  await carRepository.delete({ id: carId });

  return true;
};

export default deleteCarService;
