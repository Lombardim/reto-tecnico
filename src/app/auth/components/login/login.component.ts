import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../shared/services/auth.service";
import {emailPattern} from "../../../shared/config/custom-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'max-size flex-center'}
})
export class LoginComponent {
  public readonly formNames: {[k: string]: string} = {
    'email': 'Correo electrónico',
    'password': 'Contraseña'
  }
  public showPass = false;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailPattern)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _authService: AuthService
  ) {
  }

  public async login() {
    if(this.loginForm.invalid) {
      const controls = this.loginForm.controls;
      const invalid: string[] = [];
      for (const key in controls) {
        if(this.loginForm.get(key)?.invalid) invalid.push(key.toString());
      }
      this.toastr.error('Aún hay campos con errores: ' + this.formNames[invalid[0]], 'REGISTRO');
      console.error('Hay campos con errores');
    }else{
      try {
        await this._authService.login(this.loginForm.get('email')?.value ?? '', this.loginForm.get('password')?.value ?? '');
        this.toastr.success('Bienvenido', 'INICIO DE SESIÓN');
        await this._router.navigateByUrl('/home/game-list');
      }catch (e) {
        console.error(e);
        this.toastr.error('' + e, 'INICIO DE SESIÓN');
      }
    }
  }

  public async register() {
    await this._router.navigateByUrl('/auth/register');
  }

  //change visibility of pass field
  changePassMode() {
    this.showPass = !this.showPass;
  }
}
