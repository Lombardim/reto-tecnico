import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';

const materialList = [
  CommonModule,
  MatSortModule,
  MatTooltipModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatDialogModule,
  MatStepperModule,
  MatRadioModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatRippleModule,
  MatTableModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatListModule,
  MatTabsModule,
  MatProgressBarModule,
  MatChipsModule,
];

@NgModule({
  declarations: [],
  imports: materialList,
  exports: materialList
})
export class MaterialModule { }
