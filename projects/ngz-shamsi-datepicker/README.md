# NgzJalaliDatepicker

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

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

Run `ng build ngz-shamsi-datepicker` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngz-shamsi-datepicker`, go to the dist folder `cd dist/ngz-shamsi-datepicker` and run `npm publish`.

## Running unit tests

Run `ng test ngz-shamsi-datepicker` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
