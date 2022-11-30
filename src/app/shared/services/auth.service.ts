import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {UserInterface} from "../types/user.interface";
import {ToastrService} from "ngx-toastr";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private alertService: ToastrService
  ) { }

  get userId() {
    return this.userService.userId;
  }

  public initUsersEmails() {
    const users = localStorage.getItem('registeredEmails');
    if(users) {
      // this.userService.users = JSON.parse(users);
    }else{
      // localStorage.setItem('users', JSON.stringify(this.userService.users));
    }
  }

  public async register(user: UserInterface) {
    if(this.userService.registeredEmails.includes(user.email)) {
      console.error('El email ya está registrado en el sistema');
      this.alertService.error('El email ya está registrado en el sistema', 'REGISTRO');
      throw 'El email ya está registrado en el sistema';
    }
    try {
      this.userService.registeredEmails.push(user.email);
      await lastValueFrom(
        this.http.post(`${environment.apiURL}/user`, user)
      );
    }catch (e) {
      console.error(e);
      this.alertService.error('Ocurrió un error creando el usuario', 'REGISTRO');
    }
  }

  async login(email: string, password: string) {
    const users = localStorage.getItem('users');
    if(users) {
      const decodedUsers: UserInterface[] = JSON.parse(users);
      const loggedUser = decodedUsers.find(user => user.email === email && user.password === password);
      if(!loggedUser) {
        throw 'El correo o contraseña son incorrectos';
      }else{
        localStorage.setItem('userId', this.userService.userId.toString());
        this.userService.setLogged(loggedUser);
      }
    }else{
      throw 'No hay usuarios registrados en el sistema';
    }
  }

  logOut() {
    this.userService.setLogged(undefined);
    localStorage.removeItem('userId');
  }
}
