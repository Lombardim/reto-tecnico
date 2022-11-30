import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username: string = 'cargando...';

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _profileService: UserService
  ) { }

  ngOnInit() {
    const user = this._profileService.getLogged();
    const names: string[] = []
    if(user) {
      if(user.firstName !== '') names.push(user.firstName);
      if(user.secondName && user?.secondName !== '') names.push(user.secondName);
      if(user.lastName !== '') names.push(user.lastName);
      if(user.secondLastName && user.secondLastName !== '') names.push(user.secondLastName);
      this.username = names.join(' ');
    }
  }

  async logOut() {
    this._authService.logOut();
    await this._router.navigateByUrl('/auth/login');
  }
}
