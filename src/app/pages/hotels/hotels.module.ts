import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HotelsComponent } from './hotels.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelService } from '../../services/hotel.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../common/material/material.module';
import { AlertService } from '../../services/alert.service';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

export const routes = [
  { path: '', component: HotelsComponent, pathMatch: 'full' },
  { path: 'hotels/add', component: AddHotelComponent },
  { path: 'hotels/:id', component: HotelComponent }
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    TableModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TabViewModule,
    ToastModule
  ],
  declarations: [
    HotelsComponent,
    HotelComponent,
    AddHotelComponent,
  ],
  providers:[
    HotelService,
    AlertService
  ]
})
export class HotelsModule { }
