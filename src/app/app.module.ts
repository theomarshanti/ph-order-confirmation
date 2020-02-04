import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { PanelComponent } from './panel/panel.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { OrderWizardComponent } from './order-wizard/order-wizard.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    PanelComponent,
    AdvertisementComponent,
    OrderWizardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    // NgbCarouselModule
  ],
  providers: [
    // NgbCarousel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
