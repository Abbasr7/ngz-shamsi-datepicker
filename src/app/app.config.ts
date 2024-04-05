import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { JalaliMomentDateAdapter, NZ_DATE_CONFIG, NzDateAdapter, NzI18nService } from 'ngz-jalali-datepicker';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimations(),
    {provide: NzDateAdapter, useClass: JalaliMomentDateAdapter, deps: [NzI18nService]},
    {provide: NZ_DATE_CONFIG, useValue: {
      displayFormats: {
          veryShortWeekLabel: 'dd',
          dateInput: 'yyyy/MM/DD',
          dateTimeInput: 'yyyy-MM-DD HH:mm:ss',
          weekLabel: 'dddd',
        }
      }
    }
  ]
};
