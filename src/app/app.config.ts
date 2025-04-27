import {
  ApplicationConfig, InjectionToken,
  LOCALE_ID,
  provideZoneChangeDetection
} from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideQuillConfig} from 'ngx-quill';
import {quillConfig} from './utils/quill-config';
import {environment} from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {authInterceptor} from './core/services/auth/auth.interceptor';

registerLocaleData(localeRu);

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'disabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeature),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch(),
    ),
    provideQuillConfig(quillConfig),
    { provide: API_BASE_URL, useValue: environment.baseUrl },
  ]
};
