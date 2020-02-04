import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { Observable, of } from 'rxjs';

const cards: Card[] = [
  {
    imageUrl: 'https://www.panerabread.com/foundation/menu/grid/modern-greek-salad-with-quinoa-whole.jpg' +
      '.transform/foundation-retail-menu-placard-desktop-2x/image.20200203.jpg',
    quantity: 1,
    title: 'Modern Greek Salad with Quinoa',
    unitPrice: '8.59'
  },
  {
    imageUrl: 'https://www.panerabread.com/foundation/menu/grid/diet-pepsi-can.jpg' +
      '.transform/foundation-retail-menu-placard-desktop-2x/image.20200203.jpg',
    quantity: 2,
    title: 'Diet Pepsi Can',
    unitPrice: '1.50'
  },
  {
    imageUrl: 'https://www.panerabread.com/foundation/menu/grid/baja-grain-bowl-with-chicken-test.jpg' +
      '.transform/foundation-retail-menu-placard-desktop-2x/image.20200203.jpg',
    quantity: 1,
    title: 'Modern Greek Salad with Quinoa',
    unitPrice: '8.59',
    customizations: [
      'No Onions',
      'No Tomato',
      'Extra Corn'
    ]
  }
];

const fourCards: Card[] = [
  ...cards,
  {
    imageUrl: 'https://www.panerabread.com/foundation/menu/grid/baja-grain-bowl-with-chicken-test.jpg' +
      '.transform/foundation-retail-menu-placard-desktop-2x/image.20200203.jpg',
    quantity: 1,
    title: 'Modern Greek Salad with Quinoa',
    unitPrice: '8.59',
    customizations: [
      'No Onions',
      'No Tomato',
      'Extra Corn'
    ]
  },
];

@Injectable({
  providedIn: 'root'
})
export class OrderWizardManagerService {

  constructor() { }

  getCards(): Observable<Card[]> {
    return of(cards);
  }
}
