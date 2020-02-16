import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { HotelsModule } from './pages/hotels/hotels.module';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent, children: [
      { path: '', loadChildren: () => HotelsModule }
    ]
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ]
})

export class AppRoutingModule {}
