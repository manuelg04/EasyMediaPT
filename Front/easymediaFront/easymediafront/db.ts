// api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'https://easymediapt-0ru8-dev.fl0.io';

  constructor(private httpClient: HttpClient) { }

  registerUser(user: any) {
    return this.httpClient.post(`${this.API_URL}/api/register`, user);
  }

  loginUser(user: any) {
    return this.httpClient.post(`${this.API_URL}/api/login`, user);
  }
}
