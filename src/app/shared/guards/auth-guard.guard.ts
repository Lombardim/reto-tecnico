import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserInterface} from "../types/user.interface";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public async canActivate(route: ActivatedRouteSnapshot) {
    const {statusToEnter} = route.data;
    if(statusToEnter === 'logged') {
      const userId = localStorage.getItem('userId');
      if(!userId) {
        await this.router.navigateByUrl('/autenticacion/inicio-sesion');
      }else{
        try {
          let user: UserInterface | undefined = await this.userService.getUserById(parseInt(userId));
          this.userService.setLogged(user);
          return true;
        }catch (e) {
          console.error(e);
        }
      }
    }else{
      const userId = localStorage.getItem('userId');
      if(!userId) {
        return true;
      }else{
        try {
          let user: UserInterface | undefined = await this.userService.getUserById(parseInt(userId));
          this.userService.setLogged(user);
          await this.router.navigateByUrl('/pantalla-principal/lista-de-juegos');
        }catch (e) {
          console.error(e);
        }
      }
    }
    return false;
  }
}
