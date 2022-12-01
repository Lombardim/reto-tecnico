import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {GameInterface} from "../types/game.interface";
import {UserInterface} from "../types/user.interface";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _url: string = 'https://localhost:7260';

  constructor(
    private http: HttpClient
  ) { }

  public async getAllGames(): Promise<GameInterface[]> {
    try {
      const response = await lastValueFrom(
        this.http.get<GameInterface[]>(`${this._url}/game`)
      );
      return response ?? [];
    }catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getGameById(gameId: number): Promise<GameInterface> {
    try {
      return await lastValueFrom(
        this.http.get<GameInterface>(`${this._url}/game/${gameId}`)
      );
    }catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async updateGamePriceById(gameId: number, price: number) {
    try {
      await lastValueFrom(
        this.http.put(`${this._url}/game/price?id=${gameId}&price=${price}`, {})
      );
    }catch (e) {
      console.error(e);
      throw 'Ocurrió un error actualizando el precio del juego';
    }
  }

  public async mostRentedGame(): Promise<GameInterface[]> {
    try {
      const response = await lastValueFrom(
        this.http.get<GameInterface[]>(`${this._url}/game/most-rented`)
      );
      return response;
    }catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async mostFrequentClient(): Promise<UserInterface[]> {
    try {
      const response = await lastValueFrom(
        this.http.get<UserInterface[]>(`${this._url}/user/most-frequent`)
      );
      return response;
    }catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async mostRentedGameByRange(start: number, end: number): Promise<GameInterface[]> {
    try {
      const response = await lastValueFrom(
        this.http.get<GameInterface[]>(`${this._url}/game/most-rented/range?from=${start}&to=${end}`)
      );
      return response;
    }catch (e) {
      console.error(e);
      throw e;
    }
  }
}
