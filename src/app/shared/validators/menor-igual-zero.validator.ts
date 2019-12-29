import { AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';

export class MenorIgualZeroValidator {

  static validate(control: AbstractControl) {
    const valor = control.value;

    if (isNullOrUndefined(valor) || valor == '' || valor > 0) {
      return null;
    }

    return { menorIgualZero: true };
  }
}
