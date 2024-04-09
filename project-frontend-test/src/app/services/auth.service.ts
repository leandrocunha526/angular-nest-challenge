import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserProfile } from '../classes/userProfile';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api';
  private TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}
  login(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.API_URL}/user/login`, user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
        observe: 'response' as 'response',
      })
      .pipe(
        map((response) => {
          const responseBody = response.body;
          if (
            responseBody &&
            responseBody.token &&
            responseBody.token.token !== ''
          ) {
            const authToken = responseBody.token.token;
            localStorage.setItem(this.TOKEN_KEY, authToken);
          }
          return response;
        }),
        catchError((error) => {
          console.error('Erro ao fazer login:', error);
          return throwError(error);
        })
      );
  }
  getUserProfile(): Observable<UserProfile[]> {
    return this.http
      .get<UserProfile[]>(`${this.API_URL}/user/profile`, {
        headers: this.isAuthenticated(),
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter o perfil do usuário:', error);
          return throwError(error);
        })
      );
  }

  createUser(user: User): Observable<User[]> {
    return this.http
      .post<User[]>(`${this.API_URL}/user/register`, user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Erro ao criar usuário:', error);
          return throwError(error);
        })
      );
  }

  isAuthenticated(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`,
    });
    return headers;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
