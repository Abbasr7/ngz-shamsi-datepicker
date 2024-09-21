/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFormPatchModule } from '../core/form';
import { NzOutletModule } from '../core/outlet';
import { NzOverlayModule } from '../core/overlay';
import { NzI18nModule } from '../i18n';
import { NzIconModule } from '../icon';

import { NzTimePickerPanelComponent } from './time-picker-panel.component';
import { NzTimePickerComponent } from './time-picker.component';

@NgModule({
  declarations: [NzTimePickerComponent, NzTimePickerPanelComponent],
  exports: [NzTimePickerPanelComponent, NzTimePickerComponent],
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    NzI18nModule,
    OverlayModule,
    NzIconModule,
    NzOverlayModule,
    NzOutletModule,
    NzFormPatchModule
  ]
})
export class NzTimePickerModule {}
