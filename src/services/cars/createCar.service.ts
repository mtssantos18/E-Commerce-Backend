import AppDataSource from "../../data-source";
import { CarImages } from "../../entities/carImages.entity";
import { Car } from "../../entities/cars.entity";
import AppError from "../../errors/AppError";
import { ICarRequest } from "../../interfaces/cars";

const createCarService = async (carData: ICarRequest): Promise<Car> => {
  const carRepository = AppDataSource.getRepository(Car);
  const carImagesRepository = AppDataSource.getRepository(CarImages);

  const { name, description, km, year, coverImage, price, carPhotos } = carData;

  if (carPhotos.length < 1) {
    throw new AppError("You must add at least one image to your car.");
  }

  if (carPhotos.length > 6) {
    throw new AppError("You can't add more than 6 images to your car.");
  }

  const newCar = carRepository.create({
    name,
    description,
    km,
    year,
    coverImage,
    price,
  });

  await carRepository.save(newCar);

  carPhotos.map(async (url) => {
    const newPhoto = carImagesRepository.create({ url, car: newCar });

    await carImagesRepository.save(newPhoto);
  });

  return newCar;
};

export default createCarService;
