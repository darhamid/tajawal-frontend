import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './common/material/material.module';
import { PagesComponent } from './pages/pages.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './services/confirm-dialog.service';
import { ToastrModule } from 'ngx-toastr';
import {TableModule} from 'primeng/table';
@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    TableModule
  ],
  entryComponents:[ConfirmDialogComponent],
  providers:[ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
