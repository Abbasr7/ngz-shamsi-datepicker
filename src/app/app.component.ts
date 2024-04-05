import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzDatePickerModule } from 'ngz-jajali-datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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


  onChange(e:any) {
    console.log(e);
    
  }
}
