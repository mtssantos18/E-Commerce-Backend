export interface IMotorcycleRequest {
  name: string;
  description: string;
  km: number;
  year: number;
  coverImage: string;
  price: number;
  motorcyclePhotos: string[];
}

export interface IMotorcycleUpdateRequest {
  name?: string;
  description?: string;
  km?: number;
  year?: number;
  coverImage?: string;
  price?: number;
  motorcyclePhotos?: string[];
}
