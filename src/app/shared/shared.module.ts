import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone-pipe/phone.pipe';
import { SerialNumberPipe } from './serialNumber-pipe/serial-number.pipe';

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
