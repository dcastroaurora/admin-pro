import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidations {
  static confirmPassword(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = control.get(password)?.value;
      const confirmPasswordControl = control.get(confirmPassword)?.value;
      if (passwordControl !== confirmPasswordControl) {
        return { notMatch: true };
      }
      return null;
    };
  }
}
