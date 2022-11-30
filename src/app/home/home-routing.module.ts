import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {GameListComponent} from "./components/game-list/game-list.component";
import {GamePreviewComponent} from "./components/game-list/components/game-preview/game-preview.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'lista-de-juegos',
        component: GameListComponent
      },
      {
        path: 'juego/:id',
        component: GamePreviewComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '**',
        redirectTo: 'lista-de-juegos',
        pathMatch: 'full'
      }
    ]
  },
    {
      path: '**',
      redirectTo: '/pantalla-principal/',
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
