import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch , withInterceptors} from '@angular/common/http';
import { HttpRequestInterceptor } from './core/interceptors/http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // enrutador de Angular
    provideRouter(routes, withViewTransitions()),

    // cliente HTTP para hacer llamadas API
    provideHttpClient(withFetch(), withInterceptors([HttpRequestInterceptor])),
    provideClientHydration()
  ]
};
