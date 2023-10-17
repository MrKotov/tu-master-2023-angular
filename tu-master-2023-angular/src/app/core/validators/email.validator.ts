import { FormControl } from '@angular/forms';

export class EmailValidator {
  static validateByRegex(
    regexExp: RegExp
  ): (control: FormControl) => { [key: string]: boolean } | null {
    return function (control: FormControl): { [key: string]: boolean } | null {
      if (regexExp.test(control.value)) return null;

      return {
        validEmail: true,
      };
    };
  }
}
