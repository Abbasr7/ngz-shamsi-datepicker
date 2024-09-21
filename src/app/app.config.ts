import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { JalaliMomentDateAdapter, NZ_DATE_CONFIG, NzDateAdapter, NzI18nService, fa_IR } from 'ngz-shamsi-datepicker';

import fa from '@angular/common/locales/fa';
import { registerLocaleData } from '@angular/common';
// import { NZ_DATE_CONFIG, NzI18nService, fa_IR } from '../../projects/ngz-shamsi-datepicker/src/i18n';
// import { JalaliMomentDateAdapter, NzDateAdapter } from '../../projects/ngz-shamsi-datepicker/src/public-api';


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
