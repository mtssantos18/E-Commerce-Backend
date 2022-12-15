import AppDataSource from "../../data-source";
import { Car } from "../../entities/cars.entity";

const listCarsService = async (): Promise<Car[]> => {
  const carRepository = AppDataSource.getRepository(Car);

  const cars = await carRepository.find();

  return cars;
};

export default listCarsService;
