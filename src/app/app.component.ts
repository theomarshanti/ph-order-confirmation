import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { OrderCard } from './models/order-card.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StatusUpdatesService } from './services/status-updates.service';
import { ActionOrderCard, StatusChangeActions } from './models/order-status-dto.model';
import { Pages } from './models/pages.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private alive;

  // Time out Detection
  private userActivity: any;
  private pageTimeouts = {
    [Pages.PROMO]: {
      enforced: false,
      timeout: null
    },
    [Pages.WIZARD]: {
      enforced: true,
      timeout: 30000
    },
    [Pages.COMPLETION]: {
      enforced: true,
      timeout: 10000
    },
  };
  private userInactive: Subject<any> = new Subject();

  activePage: Pages;
  constructor(private statusUpdatesService: StatusUpdatesService,
              private router: Router) {}

  ngOnInit() {
    console.log('appComponent ngOnInit');
    this.alive = true;
    this.setPageVar();

    if (environment.enableWs) {
      console.log('app - start stream');
      this.statusUpdatesService.messages$
        .pipe(takeWhile(() => this.alive))
        .subscribe(res => this.handleUpdate(res));
    }

    this.userInactive.subscribe(() => {
      console.log('this guy is inactive');
      this.redirectToPromo();
    });

    this.resetTimer();
  }

  ngOnDestroy() {
    console.log('appComponent ngOnDestroy');
    this.alive = false;
  }

  private handleUpdate(actionOrderCard: ActionOrderCard) {
    console.log('app - handleUpdateTwo');
    switch (actionOrderCard.actionType) {
      case (StatusChangeActions.ADD_ITEM):
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
        this.handleCompletion(actionOrderCard.product);
        break;
      default:
        console.log('default');
        break;
    }
  }

  private handleAddition(product: OrderCard) {
    console.log('handleAdd - product');

    console.log(this.activePage);
    if (this.activePage !== Pages.WIZARD) {
      console.log('nav to wiz');
      this.router.navigate(['wizard']);
      this.activePage = Pages.WIZARD;
    }
    this.resetTimer();
  }

  private handleCompletion(product: OrderCard) {
    console.log('handleCompletion - product');

    if (this.activePage !== Pages.COMPLETION) {
      this.router.navigate(['completion']);
      this.activePage = Pages.COMPLETION;
    }
    this.resetTimer();
  }

  private resetTimer() {
    const pageTimeout = this.pageTimeouts[this.activePage];
    clearTimeout(this.userActivity);
    this.userActivity = pageTimeout.enforced ?
      setTimeout(() => this.userInactive.next(undefined), pageTimeout.timeout) :
      undefined;
  }

  private redirectToPromo() {
    this.router.navigate(['']);
    this.activePage = Pages.PROMO;
    this.resetTimer();
  }

  private setPageVar() {
    const param = window.location.href.split('/').pop();
    switch (param) {
      case('wizard'):
        this.activePage = Pages.WIZARD;
        break;
      case('completion'):
        this.activePage = Pages.COMPLETION;
        break;
      case(''):
      case('promo'):
      default:
        this.activePage = Pages.PROMO;
        break;
    }
  }
}
