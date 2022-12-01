import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {CreateUserInterface, UserInterface} from "../types/user.interface";
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

  public async initUsersEmails() {
    const users = this.userService.registeredEmails;
    if(users.length === 0) {
      try {
        const users: UserInterface[] = await this.userService.getAllUsers();
        this.userService.registeredEmails = users.map((user) => user.email);
      }catch (e) {
        this.alertService.error('' + e, 'INICIALIZAR USUARIOS');
      }
    }
  }

  public async addUser(user: CreateUserInterface) {
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
      throw 'Ocurrió un error registrando el usuario';
    }
  }

  async login(email: string, password: string) {
    try {
      const users = await this.userService.getAllUsers();
      if(users.length > 0) {
        const loggedUser = users.find(user => user.email === email && user.password === password);
        if(!loggedUser) {
          throw 'El correo o contraseña son incorrectos';
        }else{
          localStorage.setItem('userId', String(loggedUser.id));
          this.userService.setLogged(loggedUser);
        }
      }else{
        throw 'No hay usuarios registrados en el sistema';
      }
    }catch (e) {
      console.error(e);
      throw 'Ocurrió un error iniciando sesión: ' + e;
    }
  }

  logOut() {
    this.userService.setLogged(undefined);
    localStorage.removeItem('userId');
  }
}
