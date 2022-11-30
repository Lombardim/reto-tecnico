import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardGuard} from "./shared/guards/auth-guard.guard";


const routes: Routes = [
  {
    path: 'autenticacion',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuardGuard],
    data: { statusToEnter: 'not-logged' }
  },
  {
    path: 'pantalla-principal',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuardGuard],
    data: { statusToEnter: 'logged' },
  },

  { path: '', redirectTo: 'autenticacion', pathMatch: 'full' },
  { path: '**', redirectTo: 'autenticacion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
