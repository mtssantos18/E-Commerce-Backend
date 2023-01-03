import AppDataSource from "../../data-source";
import { VehicleImages } from "../../entities/vehicleImages.entity";
import { Vehicle } from "../../entities/vehicles.entity";
import AppError from "../../errors/AppError";
import { IVehicleRequest } from "../../interfaces/vehicles";

const createVehicleService = async (
  vehicleData: IVehicleRequest
): Promise<Vehicle> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicleImagesRepository = AppDataSource.getRepository(VehicleImages);

  const {
    name,
    description,
    km,
    year,
    coverImage,
    price,
    type,
    vehiclePhotos,
  } = vehicleData;

  if (vehiclePhotos.length < 1) {
    throw new AppError("You must add at least one image to your vehicle.");
  }

  if (vehiclePhotos.length > 6) {
    throw new AppError("You can't add more than 6 images to your vehicle.");
  }

  const newVehicle = vehicleRepository.create({
    name,
    description,
    km,
    year,
    coverImage,
    price,
    type,
  });

  await vehicleRepository.save(newVehicle);

  vehiclePhotos.map(async (url) => {
    const newPhoto = vehicleImagesRepository.create({
      url,
      vehicle: newVehicle,
    });

    await vehicleImagesRepository.save(newPhoto);
  });

  return newVehicle;
};

export default createVehicleService;
