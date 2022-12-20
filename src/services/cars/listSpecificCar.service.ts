import AppDataSource from "../../data-source";
import { Car } from "../../entities/cars.entity";
import AppError from "../../errors/AppError";

const listSpecificCarService = async (carId: string): Promise<Car> => {
  if (carId.length !== 36) {
    throw new AppError("Invalid id format.");
  }
  const carRepository = AppDataSource.getRepository(Car);

  const car = await carRepository.findOneBy({ id: carId });

  if (!car) {
    throw new AppError("Car not found.", 404);
  }

  return car;
};

export default listSpecificCarService;
