import { Component } from '@angular/core';
import { ApiService } from '../../../../db';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';  // Importa los módulos necesarios de @angular/forms

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';

  // Crea un nuevo FormGroup
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private apiService: ApiService, private router: Router) { }

  onLogin() {
    // Usa los valores del formulario reactivo
    const user = this.loginForm.value;

    if (this.loginForm.valid) { // Asegura que el formulario sea válido antes de intentar enviarlo
      this.apiService.loginUser(user).subscribe(
        (response:any) => {

          // Guardar el token en el almacenamiento local
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          // Redirigir al usuario al componente de posts
          this.router.navigate(['/posts']);
        },
        (error:any) => {
          this.errorMessage = 'Email o clave incorrectas. Intente de nuevo.';

        }
      );
    } else {

    }
  }

  onSignUp() {
    this.router.navigate(['/register']);
  }
}
