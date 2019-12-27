import { AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export class MenorIgualZeroValidator {

  static validate(control: AbstractControl) {
    const valor: number = control.value;

    if (isNullOrUndefined(valor) || valor > 0) {
      return null;
    }

    return { menorIgualZero: true };
  }
}
