export interface IAddressRequest {
  street: string;
  number: string;
  complement?: string;
  zipCode: string;
  city: string;
  state: string;
}

export interface IAddressUpdateRequest {
  street?: string;
  number?: string;
  complement?: string;
  zipCode?: string;
  city?: string;
  state?: string;
}

export interface IUserRequest {
  fullName: string;
  email: string;
  cpf: string;
  cellPhone: string;
  birthDate: Date;
  description?: string;
  isSeller: boolean;
  password: string;
  address: IAddressRequest;
}

export interface IUserUpdateRequest {
  fullName?: string;
  email?: string;
  cpf?: string;
  cellPhone?: string;
  birthDate?: Date;
  description?: string;
  isSeller?: boolean;
  password?: string;
  address?: IAddressRequest;
}

export interface IUserLogin {
  email: string;
  password: string;
}
