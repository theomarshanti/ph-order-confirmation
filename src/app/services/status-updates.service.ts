// tslint:disable: no-angle-bracket-type-assertion
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LISTENER_URL } from '../core/api.constants';
import { OrderCard } from '../models/order-card.model';
import { ActionOrderCard, StatusChangeActions } from '../models/order-status-dto.model';

@Injectable({
  providedIn: 'root'
})
export class StatusUpdatesService {
  private _messages$: Subject<ActionOrderCard>;
  public messages$: Subject<ActionOrderCard>;
  public state: ActionOrderCard[] = [];

  constructor(wsService: WebsocketService) {
    this.messages$ = new Subject<ActionOrderCard>();
    wsService.connect(LISTENER_URL)
      .pipe(map(this.castToActionOrderCard.bind(this)))
      .pipe(map(this.updateState.bind(this)))
      .subscribe((card: ActionOrderCard) => {
        this.messages$.next(card);
      })
  }

  private emit(card: ActionOrderCard) {
    this.messages$.next(card);
    return card;
  }

  public getMessages() {
    return this.state;
  }

  private castToActionOrderCard(response: MessageEvent): ActionOrderCard {
    let {data} = response;
    console.log('data - ', data);
    data = JSON.parse(data);
    console.log('data - ');
    console.log(data);

    return {
      actionType: data.actionType,
      product: {
        imageUrl:  data.imageUrl,
        quantity: Number(data.quantity),
        title: data.title,
        unitPrice: data.unitPrice,
        customizations: data.customizations
      }
    };
  }

  private updateState(actionOrderCard: ActionOrderCard): ActionOrderCard {
    if (actionOrderCard.actionType === StatusChangeActions.COMPLETE_ORDER) {
      this.state = [];
    } else {
      this.state.push(actionOrderCard);
    }
    return actionOrderCard;
  }

  public resetState() {
    this.state = [];
  }
}
