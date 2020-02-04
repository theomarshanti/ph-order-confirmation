import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import { LISTENER_URL } from './api.constants';

export const BASE_URL = environment.API.URL;

export const rxStompConfig: () => InjectableRxStompConfig =
  () => {
    return {
      webSocketFactory: () => new SockJS(LISTENER_URL),
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 200,
      debug: (msg: string): void => {
        console.log(new Date(), msg);
      }
    }
};
