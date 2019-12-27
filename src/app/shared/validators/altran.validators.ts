import { AbstractControl } from '@angular/forms';
import { MenorIgualZeroValidator } from './menor-igual-zero.validator';

export class AltranValidators {

  static menorIgualZero(control: AbstractControl) {
    return MenorIgualZeroValidator.validate(control);
  }
}
