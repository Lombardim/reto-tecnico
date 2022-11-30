import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import { GamePreviewComponent } from './components/game-list/components/game-preview/game-preview.component';
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent,
    GameListComponent,
    DashboardComponent,
    GamePreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
