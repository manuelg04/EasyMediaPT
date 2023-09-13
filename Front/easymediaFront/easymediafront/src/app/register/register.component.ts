import { ApiService } from './../../../db';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, this.validUsername]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordsMatch });


  constructor(private ApiService: ApiService) { }
  ngOnInit(): void {
  }

 // Validación para comprobar si las contraseñas coinciden
 passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'mismatch': true };
  }
  return null;
}

// Validación para comprobar si el nombre de usuario es válido
validUsername(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const hasInvalidCharacters = /[^a-zA-Z\s]/.test(value);

  if (hasInvalidCharacters) {
    return { 'invalidCharacters': true };
  }
  return null;
}


  onSubmit() {
    if (this.registerForm.valid) {
      this.ApiService.registerUser(this.registerForm.value).subscribe(
        (response: any) => {

          // Aquí puedes redirigir al usuario o hacer algo más
        },
        (error: any) => {

        }
      );
    }
  }

}
