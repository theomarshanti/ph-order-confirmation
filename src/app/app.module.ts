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
import {
  InjectableRxStompConfig,
  RxStompService, rxStompServiceFactory
} from '@stomp/ng2-stompjs';
import {rxStompConfig} from './core/rx-stomp.config';
import { OrderUpdateService } from './services/order-update.service';

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
  ],
  providers: [
    OrderUpdateService,
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    {
      provide: InjectableRxStompConfig,
      useFactory: rxStompConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
