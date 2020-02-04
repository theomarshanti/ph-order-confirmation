import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { OrderWizardManagerService } from '../services/order-wizard-manager.service';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';

const carouselPageSize = 3;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  cards: Card[] = [];
  showCarousel = false;
  carouselPages: Card[][] = [];
  total: number;
  pageNumber = 1;
  constructor(private manager: OrderWizardManagerService) { }

  ngOnInit() {
    this.manager.getCards().pipe(first()).subscribe((cards: Card[]) => {
      this.setCards(cards);
      this.calculateTotal();
    });
  }

  setCards(cards: Card[]) {
    this.cards = [...cards];
    console.log(cards.length);
    console.log(carouselPageSize);
    if (cards.length >= carouselPageSize) {
      this.showCarousel = true;
      this.carouselPages = [];
      while (cards.length) {
        this.carouselPages.push(cards.splice(0, carouselPageSize));
      }
    } else {
      this.showCarousel = false;
    }
  }

  calculateTotal() {
    this.total = (this.cards.map((x) => Number(x.unitPrice) * x.quantity)).reduce((x, y) => x + y);
  }

  onSlide(event: NgbSlideEvent) {
    this.pageNumber = Number(event.current.split('-')[2]) + 1;
  }
}
