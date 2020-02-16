import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    hotels: 'hotels',
    error404: '404'
  },
  endpoints: {
    hotels: 'http://localhost:4200/hotels'
  },
  apiUrl : 'http://localhost:8000',
  repositoryURL: 'https://github.com/darhamid/tajawal-frontend'
};
// ng serve --host=IP_ADDRESS //
