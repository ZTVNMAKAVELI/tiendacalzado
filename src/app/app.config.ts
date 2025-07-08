import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Provee el enrutador de Angular con transiciones suaves.
    provideRouter(routes, withViewTransitions()),

    // Provee el cliente HTTP para hacer llamadas a tu API de Java.
    provideHttpClient(withFetch()),

    // Provee la hidratación del cliente (para Server-Side Rendering).
    provideClientHydration()
  ]
};
