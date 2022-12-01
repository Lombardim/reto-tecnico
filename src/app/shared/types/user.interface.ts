export interface UserInterface {
  id: number;
  userType: UserType;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  birthDate: number;
  email: string;
  password: string;
  phone: number;
}

export interface CreateUserInterface {
  userType: UserType;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  birthDate: number;
  email: string;
  password: string;
  phone: number;
}

export enum UserType {
  admin = 'admin',
  client = 'client'
}
