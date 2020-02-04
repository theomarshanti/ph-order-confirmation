import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { OrderWizardComponent } from './order-wizard/order-wizard.component';

const routes: Routes = [
  {
    path: '',
    component: AdvertisementComponent
  },
  {
    path: 'pending',
    redirectTo: ''
  },
  {
    path: 'status',
    component: OrderWizardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
