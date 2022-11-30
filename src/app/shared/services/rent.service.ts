import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Rent} from "../types/rent.interface";

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private _url: string = 'https://localhost:7260';

  constructor(
    private http: HttpClient
  ) { }

  public async getAllRent(): Promise<Rent[]> {
    try {
      return await lastValueFrom(
        this.http.get<Rent[]>(`${this._url}/rent`)
      );
    }catch (e) {
      console.error(e);
      throw 'Ocurrió un error obteniendo los juegos rentados';
    }
  }

  public async getRentById(rentId: number): Promise<Rent> {
    try {
      const rents: Rent[] = await this.getAllRent();
      const res: Rent | undefined = rents.find((rent) => rent.id === rentId);
      if(res) {
        return res;
      }else{
        throw 'Ocurrió un error buscando la renta seleccionada';
      }
    }catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getAllRentsById(userId: number): Promise<Rent[]> {
    try {
      const response = await lastValueFrom(
        this.http.get<Rent[]>(`${this._url}/rent/user/${userId}`)
      );
      return response;
    }catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async claimAGameFromRent(rentId: number) {
    try {
      const response = await lastValueFrom(
        this.http.put(`${this._url}/rent?id=${rentId}`, {})
      );

      console.log(response);
    }catch (e) {
      console.error(e);
    }
  }

  async rentAGame(gameId: number, userId: number, days: number) {
    try {
      const date = new Date();
      date.setDate(date.getDate() + days)
      await lastValueFrom(
        this.http.post(`${this._url}/rent`, {
          "rentedUntil": date.toISOString(),
          "userId": userId,
          "gameId": gameId
        })
      );
    }catch (e) {
      console.error(e);
    }
  }
}
