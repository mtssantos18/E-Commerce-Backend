import AppDataSource from "../../data-source";
import { CarImages } from "../../entities/carImages.entity";
import { Car } from "../../entities/cars.entity";
import AppError from "../../errors/AppError";
import { ICarUpdateRequest } from "../../interfaces/cars";

const updateCarService = async (carId: string, carInfo: ICarUpdateRequest) => {
  if (carId.length !== 36) {
    throw new AppError("Invalid id format.");
  }

  const carRepository = AppDataSource.getRepository(Car);
  const carImagesRepository = AppDataSource.getRepository(CarImages);

  const car = await carRepository.findOneBy({ id: carId });

  if (!car) {
    throw new AppError("Car not found.", 404);
  }

  await carRepository.update(car.id, {
    name: carInfo.name ? carInfo.name : car.name,
    description: carInfo.description ? carInfo.description : car.description,
    km: carInfo.km ? carInfo.km : car.km,
    year: carInfo.year ? carInfo.year : car.year,
    coverImage: carInfo.coverImage ? carInfo.coverImage : car.coverImage,
    price: carInfo.price ? carInfo.price : car.price,
  });

  if (carInfo.carPhotos) {
    if (carInfo.carPhotos.length < 1) {
      throw new AppError("You must add at least one image to your car.");
    }

    if (carInfo.carPhotos.length > 5) {
      throw new AppError("You can't add more than 5 images to your car.");
    }

    await carImagesRepository.delete({ car: { id: car.id } });

    carInfo.carPhotos.map(async (url) => {
      const newPhoto = carImagesRepository.create({ url, car });

      await carImagesRepository.save(newPhoto);
    });
  }

  const updatedCar = await carRepository.findOneBy({ id: carId });

  return updatedCar;
};

export default updateCarService;
