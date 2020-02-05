
import {environment} from '../../environments/environment';

export const BASE_URL = `${environment.API.HTTP_PROTOCOL}${environment.API.URL}:${environment.API.HTTP_PORT}`;
export const LISTENER_URL = `${environment.API.WS_PROTOCOL}${environment.API.URL}:${environment.API.WS_PORT}`;
