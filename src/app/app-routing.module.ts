import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { OrderWizardComponent } from './order-wizard/order-wizard.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: AdvertisementComponent
  },
  {
    path: 'promo',
    redirectTo: ''
  },
  {
    path: 'wizard',
    component: OrderWizardComponent
  },
  {
    path: 'completion',
    component: ConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
