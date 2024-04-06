# NgzDatepicker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## Demo
see [DEMO](https://stackblitz.com/~/github.com/Abbasr7/ngz-shamsi-datepicker)

## Usage

`$ ng new PROJECT_NAME`
`$ cd PROJECT_NAME`
`$ npm i ngz-shamsi-datepicker`

see full usage guide in [Ng-Zorro-Package](https://ng.ant.design/components/date-picker/en)

## Provide custom DateAdapter Like Jalali
If you need to present another calendar like Jalali or Hijri, you can provide a custom NzDateAdapter which implements required methods to deal with native date object.

```
Example
import { NzDatePickerModule, NzDateAdapter } from 'ngz-shamsi-datepicker';

export class CustomDateAdapter extends NzDateAdapter<any> {
  // implementation of abstract methods
}

@NgModule({
  imports: [NzDatePickerModule],
  providers: [{ provide: NzDateAdapter, useClass: CustomDateAdapter }],
})
export class AppModule {}
```

we provide a custom Jalali adaptor in this package:

```
Example

import { provideAnimations } from '@angular/platform-browser/animations';
import { NzDatePickerModule, JalaliMomentDateAdapter, NZ_DATE_CONFIG, NzDateAdapter, NzI18nService } from 'ngz-shamsi-datepicker';

@NgModule({
  imports: [NzDatePickerModule],
  providers: [
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
  ],
})
export class AppModule {}
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
