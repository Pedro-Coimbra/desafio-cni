import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function textoObrigatorioValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string') {
      return value ? null : { textoObrigatorio: true };
    }

    return value.trim().length > 0 ? null : { textoObrigatorio: true };
  };
}
