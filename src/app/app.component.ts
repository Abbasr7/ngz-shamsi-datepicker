import { Component } from '@angular/core';
import { en_US, fa_IR, NzI18nService } from 'projects/ngz-shamsi-datepicker/src/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ngz-datepicker-14';
  ranges = { "امروز": [new Date(), new Date()], 'این ماه': [new Date(), new Date()] };
  isPersian = false;

  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(this.isPersian? fa_IR :en_US);
  }

  changeLanguage(): void {
    this.isPersian = !this.isPersian;
    this.i18n.setLocale(this.isPersian? fa_IR : en_US);
  }

  onChange(e:any) {
    console.log(e);
    
  }
}
