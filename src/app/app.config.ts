import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { NZ_DATE_CONFIG, NzDateAdapter, NzI18nService } from 'ngz-jajali-datepicker';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimations()
  ]
};
