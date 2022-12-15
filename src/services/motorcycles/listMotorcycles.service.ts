import AppDataSource from "../../data-source";
import { Motorcycle } from "../../entities/motorcycles.entity";

const listMotorcyclesService = async (): Promise<Motorcycle[]> => {
  const motorcyclesRepository = AppDataSource.getRepository(Motorcycle);

  const motorcycles = await motorcyclesRepository.find();

  return motorcycles;
};

export default listMotorcyclesService;
