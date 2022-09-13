import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from 'moment';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = moment(control.value);
    const today = moment();

    const isFutureDate: boolean = inputDate.isAfter(today);

    return isFutureDate ? { futureDate: true } : null;
  }
}
