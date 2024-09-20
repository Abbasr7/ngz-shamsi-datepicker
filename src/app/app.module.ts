import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JalaliMomentDateAdapter, NZ_DATE_CONFIG, NzDateAdapter, NzDatePickerModule, NzI18nService } from 'projects/ngz-shamsi-datepicker/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NzDatePickerModule, FormsModule, ReactiveFormsModule
  ],
  providers: [
    // provideAnimations(),
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
  bootstrap: [AppComponent]
})
export class AppModule { }
