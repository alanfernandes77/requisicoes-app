import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serialNumber'
})
export class SerialNumberPipe implements PipeTransform {

  transform(serialNumber: string): string {

    const p1 = serialNumber.substring(0,4);
    const p2 = serialNumber.substring(4,7);

    return `${p1.toUpperCase()}-${p2}`;
  }
}
