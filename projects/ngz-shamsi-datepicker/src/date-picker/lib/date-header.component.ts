/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/../blob/master/LICENSE
 */

import { NgForOf, NgIf, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';

import { DateHelperService } from '../../i18n';

import { AbstractPanelHeader } from './abstract-panel-header';
import { PanelSelector } from './interface';
import { transCompatFormat } from './util';
import { CandyDate, CandyDateFac } from '../../core/time';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'date-header', // eslint-disable-line @angular-eslint/component-selector
  exportAs: 'dateHeader',
  templateUrl: './abstract-panel-header.html',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass]
})
export class DateHeaderComponent extends AbstractPanelHeader {
  constructor(private dateHelper: DateHelperService,@Inject(CandyDate) candyDate: CandyDateFac) {
    super(candyDate);
  }

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-year-btn`,
        title: this.locale.yearSelect,
        onClick: () => this.changeMode('year'),
        label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
      },
      {
        className: `${this.prefixCls}-month-btn`,
        title: this.locale.monthSelect,
        onClick: () => this.changeMode('month'),
        label: this.dateHelper.format(this.value.nativeDate, this.locale.monthFormat || 'MMM')
      }
    ];
  }
}
