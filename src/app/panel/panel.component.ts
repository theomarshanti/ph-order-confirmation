import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderCard } from '../models/order-card.model';
import { OrderWizardManagerService } from '../services/order-wizard-manager.service';
import { pipe } from 'rxjs';
import { first, map, takeWhile } from 'rxjs/operators';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { OrderUpdateService } from '../services/order-update.service';
import { environment } from 'src/environments/environment';
import { StatusUpdatesService } from '../services/status-updates.service';
import { ActionOrderCard, StatusChangeActions } from '../models/order-status-dto.model';

const carouselPageSize = 3;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  cards: OrderCard[] = [];
  showCarousel = false;
  carouselPages: OrderCard[][] = [[]];
  totalPrice: number;
  pageNumber = 1;
  alive;
  constructor(private orderUpdateService: OrderUpdateService,
              private statusUpdatesService: StatusUpdatesService,
              private manager: OrderWizardManagerService) { }

  ngOnInit() {
    this.alive = true;

    if (environment.enableWs) {
      console.log('panel - start stream');
      // this.statusUpdatesService.messages
      //   .pipe(takeWhile(() => this.alive))
      //   .subscribe(res => this.handleUpdate(res));
      this.statusUpdatesService.messages$
        .pipe(takeWhile(() => this.alive))
        .subscribe(res => this.handleUpdate(res));
      this.getMessages();
    } else {
      this.manager.getCards().pipe(first()).subscribe((cards: OrderCard[]) => {
        this.storeCards(cards);
        this.calculateTotal();
      });
    }
  }

  ngOnDestroy() {
    console.log('app component destroy');
    this.statusUpdatesService.resetState();
    this.alive = false;
  }

  get numberOfPages() {
    return this.carouselPages.length;
  }

  private handleUpdate(actionOrderCard: ActionOrderCard) {
    console.log('panel - handleUpdate');
    switch (actionOrderCard.actionType) {
      case (StatusChangeActions.ADD_ITEM):
        console.log('handleAdd');
        this.handleAddition(actionOrderCard.product);
        break;
      case (StatusChangeActions.EDIT_ITEM):
        console.log('edit - unimplemented!');
        console.log('console');
        break;
      case (StatusChangeActions.DELETE_ITEM):
        console.log('delete - unimplemented!');
        console.log('console');
        break;
      case (StatusChangeActions.COMPLETE_ORDER):
      default:
        console.log('default');
        break;
    }
  }

  private handleAddition(product: OrderCard) {
    console.log('handleAddition');
    this.addCard(product);
  }

  private addCard(product: OrderCard) {
    if (this.cards.length >= carouselPageSize) {
      if (!this.showCarousel) { // Meaning cards.length = carouselPageSize
        this.carouselPages[0] = [...this.cards];
        this.showCarousel = true;
      }
      const lastCarouselPage = this.carouselPages[this.carouselPages.length - 1];
      if (lastCarouselPage.length === carouselPageSize) {
        this.carouselPages.push([product]);
      } else {
        this.carouselPages[this.carouselPages.length - 1].push(product);
      }
    }
    this.cards.push(product);
    this.calculateTotal();
  }

  getMessages() {
    const messages: ActionOrderCard[] = this.statusUpdatesService.getMessages();
    console.log('getMessages returns - ', messages.length);
    console.log(messages);
    this.storeBatch(messages);
    this.calculateTotal();
  }

  storeBatch(actionOrderCards: ActionOrderCard[]) {
    const cards = actionOrderCards.map((x) => x.product);
    this.storeCards(cards);
  }

  storeCards(cards: OrderCard[]) {
    this.cards = [...cards];
    if (cards.length > carouselPageSize) {
      this.carouselPages = [];
      while (cards.length) {
        this.carouselPages.push(cards.splice(0, carouselPageSize));
      }
      this.showCarousel = true;
    } else {
      this.showCarousel = false;
    }
  }

  calculateTotal() {
    console.log('calculateTotal');
    this.totalPrice = this.cards.length && (this.cards.map((x) => Number(x.unitPrice) * x.quantity)).reduce((x, y) => x + y);
  }

  onSlide(event: NgbSlideEvent) {
    this.pageNumber = (this.pageNumber === this.carouselPages.length) ? 1 : this.pageNumber + 1 ;
  }
}
