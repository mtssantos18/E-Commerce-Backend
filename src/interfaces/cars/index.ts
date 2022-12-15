export interface ICarRequest {
  name: string;
  description: string;
  km: number;
  year: number;
  coverImage: string;
  price: number;
  carPhotos: string[];
}

export interface ICarUpdateRequest {
  name?: string;
  description?: string;
  km?: number;
  year?: number;
  coverImage?: string;
  price?: number;
  carPhotos?: string[];
}
