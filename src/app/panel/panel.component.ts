import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderCard } from '../models/order-card.model';
import { OrderWizardManagerService } from '../services/order-wizard-manager.service';
import { pipe } from 'rxjs';
import { first, map, takeWhile } from 'rxjs/operators';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { OrderUpdateService } from '../services/order-update.service';

const carouselPageSize = 3;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  @Input() cards: OrderCard[] = [];
  showCarousel = false;
  carouselPages: OrderCard[][] = [];
  total: number;
  pageNumber = 1;
  alive;
  constructor(private orderUpdateService: OrderUpdateService,
              private manager: OrderWizardManagerService) { }

  ngOnInit() {
    this.startOrderUpdateStream();
    // this.manager.getCards().pipe(first()).subscribe((cards: OrderCard[]) => {
    //   this.setCards(cards);
    //   this.calculateTotal();
    // });
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

  handleOrderCard(card: OrderCard) {
    this.cards.push(card);
  }

  setCards(cards: OrderCard[]) {
    this.cards = [...cards];
    if (cards.length > carouselPageSize) {
      this.showCarousel = true;
      this.carouselPages = [];
      while (cards.length) {
        this.carouselPages.push(cards.splice(0, carouselPageSize));
      }
    } else {
      this.showCarousel = false;
    }
  }

  formatUpdate(res: any): OrderCard {
    return res as OrderCard;
  }

  calculateTotal() {
    this.total = (this.cards.map((x) => Number(x.unitPrice) * x.quantity)).reduce((x, y) => x + y);
  }

  onSlide(event: NgbSlideEvent) {
    this.pageNumber = Number(event.current.split('-')[2]) + 1;
  }
}
