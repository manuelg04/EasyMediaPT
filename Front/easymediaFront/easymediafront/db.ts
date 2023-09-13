// api.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createPost(postData: any) {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token); // Configurar las cabeceras
    return this.httpClient.post(`${this.API_URL}/api/posts`, postData, { headers });
  }

  getMyPublications(date?: string) {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token); // Configurar las cabeceras

    let url = `${this.API_URL}/api/posts/mine`;
    if (date) {
      url += `?date=${date}`;
    }
    return this.httpClient.get(url, { headers });
  }

  getAllPublications(date?: string, keyword?: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    let url = `${this.API_URL}/api/posts`;
    if (date || keyword) {
      url += `?date=${date}&keyword=${keyword}`;
    }
    return this.httpClient.get(url, { headers });
  }



}
