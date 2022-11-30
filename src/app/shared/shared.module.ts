import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { DialogComponent } from './components/dialog/dialog.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DialogComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
    exports: [
        HeaderComponent,
        TableComponent,
    ],
  providers: []
})
export class SharedModule {
}
