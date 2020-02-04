import { Component, OnInit, Input } from '@angular/core';
import { OrderCard } from '../models/order-card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() info: OrderCard;

  get price() {
    return Number(this.info.unitPrice) * this.info.quantity;
  }

  description = ''
  constructor() { }

  ngOnInit() {
  }

}
