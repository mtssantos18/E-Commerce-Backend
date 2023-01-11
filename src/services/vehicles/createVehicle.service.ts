import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { VehicleImages } from "../../entities/vehicleImages.entity";
import { Vehicle } from "../../entities/vehicles.entity";
import AppError from "../../errors/AppError";
import { IVehicleRequest } from "../../interfaces/vehicles";

const createVehicleService = async (
  vehicleData: IVehicleRequest,
  userId: string
): Promise<Vehicle> => {
  const userRepository = AppDataSource.getRepository(User);
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicleImagesRepository = AppDataSource.getRepository(VehicleImages);

  const user = await userRepository.findOneByOrFail({ id: userId });

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
    user,
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
