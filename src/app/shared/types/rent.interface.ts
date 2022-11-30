import {UserInterface} from "./user.interface";
import {GameInterface} from "./game.interface";

export interface Rent {
  id: number;
  game: GameInterface;
  rentedBy: UserInterface;
  totalPayed: number;
  rentStatus: RentStatus;

  //DATES
  rentedUntil: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export enum RentStatus {
  RENTED = 1,
  CLAIMED = 2
}
