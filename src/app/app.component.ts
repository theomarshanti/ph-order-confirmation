import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderUpdateService } from './services/order-update.service';
import { takeWhile, map } from 'rxjs/operators';
import { OrderCard } from './models/order-card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ph-order-confirmation';
  orders: OrderCard[] = [];
  alive;

  constructor(private orderUpdateService: OrderUpdateService,
    private router: Router) {}

  ngOnInit() {
    console.log('app component init');
    this.alive = true;
    this.startOrderUpdateStream();
  }

  ngOnDestroy() {
    console.log('app component destroy');
    this.alive = false;
  }

  private startOrderUpdateStream() {
    this.orderUpdateService.statusUpdateStream().pipe(
      map(update => this.formatUpdate(update)),
      takeWhile(this.alive)
    ).subscribe((card: OrderCard) => {
      this.handleOrderCard(card);
    });
  }

  formatUpdate(res: any): OrderCard {
    return res as OrderCard;
  }

  handleOrderCard(card: OrderCard) {
    if (!this.orders.length) {
      console.log('navigating to status');
      this.router.navigate(['status']);
    }
    this.orders.push(card);
  }
}
