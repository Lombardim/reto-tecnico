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
        path: 'game-list',
        component: GameListComponent
      },
      {
        path: 'game-preview/:id',
        component: GamePreviewComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '**',
        redirectTo: 'game-list',
        pathMatch: 'full'
      }
    ]
  },
    {
      path: '**',
      redirectTo: '/home/',
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
