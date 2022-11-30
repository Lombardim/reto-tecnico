import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {UserInterface, UserType} from "../../../shared/types/user.interface";
import {ToastrService} from "ngx-toastr";
import {emailPattern, numberPattern} from "../../../shared/config/custom-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {'class': 'max-size flex-center'}
})
export class RegisterComponent {
  public readonly formNames: {[k: string]: string} = {
    'firstName': 'Primer Nombre',
    'secondName': 'Segundo Nombre',
    'lastName': 'Primer Apellido',
    'secondLastName': 'Segundo Apellido',
    'age': 'Edad',
    'email': 'Correo electrónico',
    'password': 'Contraseña'
  }
  public showPass = false;
  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    secondName: new FormControl(''),
    lastName: new FormControl('', [
      Validators.required
    ]),
    secondLastName: new FormControl(''),
    age: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
      Validators.pattern(numberPattern)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailPattern)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });


  constructor(
    private _router: Router,
    private _authService: AuthService,
    private toastr: ToastrService
  ) { }

  public async register() {
    if(this.registerForm.invalid) {
      const controls = this.registerForm.controls;
      const invalid: string[] = [];
      for (const key in controls) {
        if(this.registerForm.get(key)?.invalid) invalid.push(key.toString());
      }
      this.toastr.error('Aún hay campos con errores: ' + this.formNames[invalid[0]], 'REGISTRO');
      return;
    }
    try {
      const user: UserInterface = {
        id: this._authService.userId,
        userType: UserType.client,
        firstName: this.registerForm.get('firstName')?.value ?? '',
        secondName: this.registerForm.get('secondName')?.value ?? '',
        lastName: this.registerForm.get('lastName')?.value ?? '',
        secondLastName: this.registerForm.get('secondLastName')?.value ?? '',
        birthDate: parseInt(this.registerForm.get('age')?.value) ?? 0,
        email: this.registerForm.get('email')?.value ?? '',
        password: this.registerForm.get('password')?.value ?? '',
        phone: this.registerForm.get('phone')?.value ?? '',
      };
      await this._authService.register(user);
      this.toastr.success('Cuenta registrada exitosamente', 'REGISTRO');
      await this.goBack();
    }catch (e) {
      console.error(e);
      this.toastr.error('Ocurrió un error: ' + e, 'REGISTRO');
    }
  }

  public async goBack() {
    await this._router.navigateByUrl('/auth/login');
  }
}
