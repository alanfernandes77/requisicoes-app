import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './pipes/phone.pipe';
import { SerialNumberPipe } from './pipes/serial-number.pipe';
;

@NgModule({
  declarations: [
    PhonePipe,
    SerialNumberPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhonePipe,
    SerialNumberPipe
  ]
})
export class SharedModule { }
