import AppDataSource from "../../data-source";
import { MotorcycleImages } from "../../entities/motorcycleImages.entity";
import { Motorcycle } from "../../entities/motorcycles.entity";
import AppError from "../../errors/AppError";
import { IMotorcycleRequest } from "../../interfaces/motorcycles";

const createMotorcycleService = async (
  motorcycleData: IMotorcycleRequest
): Promise<Motorcycle> => {
  const motorcycleRepository = AppDataSource.getRepository(Motorcycle);
  const motorcycleImagesRepository =
    AppDataSource.getRepository(MotorcycleImages);

  const { name, description, km, year, coverImage, price, motorcyclePhotos } =
    motorcycleData;

  if (motorcyclePhotos.length < 1) {
    throw new AppError("You must add at least one image to your motorcycle.");
  }

  if (motorcyclePhotos.length > 6) {
    throw new AppError("You can't add more than 6 images to your motorcycle.");
  }

  const newMotorcycle = motorcycleRepository.create({
    name,
    description,
    km,
    year,
    coverImage,
    price,
  });

  await motorcycleRepository.save(newMotorcycle);

  motorcyclePhotos.map(async (url) => {
    const newPhoto = motorcycleImagesRepository.create({
      url,
      motorcycle: newMotorcycle,
    });

    await motorcycleImagesRepository.save(newPhoto);
  });

  return newMotorcycle;
};

export default createMotorcycleService;
