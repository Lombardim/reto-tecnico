import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  async logOut() {
    this._authService.logOut();
    await this._router.navigateByUrl('/autenticacion/inicio-sesion');
  }
}
