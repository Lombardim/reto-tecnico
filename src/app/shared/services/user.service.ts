import { Injectable } from '@angular/core';
import {UserInterface} from "../types/user.interface";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _logged: UserInterface | undefined;
  public registeredEmails: string[] = [];

  get userId() {
    return this._logged?.id ?? -1;
  }

  constructor(
    private http: HttpClient,
    private alertService: ToastrService
  ) { }

  getLogged(): UserInterface | undefined {
    return this._logged;
  }

  setLogged(user?: UserInterface) {
    this._logged = user;
  }

  async getAllUsers() {
    try {
      await lastValueFrom(
        this.http.get<UserInterface[]>(`${environment.apiURL}/user`)
      );
    }catch (e) {
      console.error(e);
      this.alertService.error('Ocurrió un error obteniendo los usuarios', 'OBTENER USUARIOS');
    }
  }

  async getUserById(userId: number): Promise<UserInterface> {
    try {
      const response = await lastValueFrom(
        this.http.get<UserInterface>(`${environment.apiURL}/user/${userId}`)
      );
      return response;
    }catch (e) {
      console.error(e);
      throw 'Ocurrió un error obteniendo los usuarios';
    }
  }
}
