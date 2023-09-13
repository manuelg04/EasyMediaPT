import { Component } from '@angular/core';
import { ApiService } from '../../../../db';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onLogin() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.apiService.loginUser(user).subscribe(
      (response:any) => {
        console.log('Login successful', response);
        // Aquí puedes guardar el token en el almacenamiento local y redirigir al usuario
      },
      (error:any) => {
        console.log('Login failed', error);
      }
    );
  }

  onSignUp() {
    this.router.navigate(['/register']);
  }
}
