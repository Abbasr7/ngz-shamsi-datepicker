/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormPatchModule } from '../core/form';
import { NzNoAnimationModule } from '../core/no-animation';
import { NzOutletModule } from '../core/outlet';
import { NzOverlayModule } from '../core/overlay';
import { NzIconModule } from '../icon';
// import { NzTimePickerModule } from '../time-picker';

import { CalendarFooterComponent } from './calendar-footer.component';
import { NzDatePickerComponent } from './date-picker.component';
import { DateRangePopupComponent } from './date-range-popup.component';
import { InnerPopupComponent } from './inner-popup.component';
import { LibPackerModule } from './lib/lib-packer.module';
import { NzMonthPickerComponent } from './month-picker.component';
import { NzRangePickerComponent } from './range-picker.component';
import { NzWeekPickerComponent } from './week-picker.component';
import { NzYearPickerComponent } from './year-picker.component';
import { fa_IR } from '../i18n';
import fa from '@angular/common/locales/fa';
import { registerLocaleData } from '@angular/common';

registerLocaleData(fa, fa_IR);
@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    OverlayModule,
    LibPackerModule,
    NzIconModule,
    NzOverlayModule,
    NzNoAnimationModule,
    NzFormPatchModule,
    NzOutletModule,
    LibPackerModule
  ],
  exports: [
    NzDatePickerComponent,
    NzRangePickerComponent,
    NzMonthPickerComponent,
    NzYearPickerComponent,
    NzWeekPickerComponent
  ],
  declarations: [
    NzDatePickerComponent,
    NzMonthPickerComponent,
    NzYearPickerComponent,
    NzWeekPickerComponent,
    NzRangePickerComponent,

    CalendarFooterComponent,
    InnerPopupComponent,
    DateRangePopupComponent
  ]
})
export class NzDatePickerModule {}
