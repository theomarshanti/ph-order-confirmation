import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { shareReplay, map } from 'rxjs/operators';

@Injectable()
export class OrderUpdateService {
    private wsStatusUpdates$: Observable<Message>;

    constructor(private http: HttpClient, private stompService: RxStompService) {
      this.wsStatusUpdates$ = this.stompService.watch('/topic/transactions');
    }

    statusUpdateStream(): Observable<any> {
        return this.wsStatusUpdates$.pipe(
            map((message: Message) => JSON.parse(message.body)),
            shareReplay()
        );
    }
}