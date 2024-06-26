/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/../blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzStringTemplateOutletDirective } from './string_template_outlet.directive';

@NgModule({
  imports: [NzStringTemplateOutletDirective],
  exports: [NzStringTemplateOutletDirective]
})
export class NzOutletModule {}
