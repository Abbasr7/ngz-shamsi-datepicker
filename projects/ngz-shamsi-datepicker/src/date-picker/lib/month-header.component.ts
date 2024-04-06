/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/../blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';

import { DateHelperService } from '../../i18n';

import { AbstractPanelHeader } from './abstract-panel-header';
import { PanelSelector } from './interface';
import { transCompatFormat } from './util';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { CandyDate, CandyDateFac } from '../../core/time';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'month-header', // eslint-disable-line @angular-eslint/component-selector
  exportAs: 'monthHeader',
  templateUrl: './abstract-panel-header.html',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass]
})
export class MonthHeaderComponent extends AbstractPanelHeader {
  constructor(private dateHelper: DateHelperService,@Inject(CandyDate) candyDate: CandyDateFac) {
    super(candyDate);
  }

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-month-btn`,
        title: this.locale.yearSelect,
        onClick: () => this.changeMode('year'),
        label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
      }
    ];
  }
}
