import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { OrderWizardManagerService } from '../services/order-wizard-manager.service';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public cards: Card[] = [
  ];

  constructor(private manager: OrderWizardManagerService) { }

  ngOnInit() {
    this.manager.getCards().pipe(first()).subscribe((res: Card[]) => {
      this.cards = res;
    });
  }

}
