
import {environment} from '../../environments/environment';

export const BASE_URL = environment.API.URL;
export const LISTENER_PORT = environment.API.PORT;
export const LISTENER_URL = `${BASE_URL}:${LISTENER_PORT}`;
