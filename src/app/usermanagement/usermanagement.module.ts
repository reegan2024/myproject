import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ListusersComponent } from './listusers/listusers.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ListusersComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSortModule
  ],
  exports:[
    ListusersComponent,
    
  ],
})
export class UsermanagementModule { }
