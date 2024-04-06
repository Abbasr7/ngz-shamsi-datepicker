/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/../blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { NzValidateStatus } from '../types';

@Injectable()
export class NzFormStatusService {
  formStatusChanges = new ReplaySubject<{ status: NzValidateStatus; hasFeedback: boolean }>(1);
}
