import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule, NzI18nService, en_US, fa_IR } from 'ngz-jalali-datepicker';
// import { NzDatePickerModule, NzI18nService } from '../../projects/ngz-jalali-datepicker/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzDatePickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'ngz-datepicker';
  ranges = { "امروز": [new Date(), new Date()], 'این ماه': [new Date(), new Date()] };
  isPersian = true;

  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(this.isPersian? fa_IR :en_US);
    console.log(this.i18n.getLocale());
  }

  changeLanguage(): void {
    this.isPersian = !this.isPersian;
    this.i18n.setLocale(this.isPersian? fa_IR : en_US);
  }

  onChange(e:any) {
    console.log(e);
    
  }
}
