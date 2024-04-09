import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Devices } from '../classes/devices';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private API_URL = 'http://localhost:3000/api';
  devices: Devices[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getDevice(): Observable<Devices[]> {
    return this.http
      .get<Devices[]>(`${this.API_URL}/device/list`, {
        headers: this.authService.isAuthenticated(),
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter o device por usuário', error);
          return throwError(error);
        })
      );
  }
  getDeviceById(id: string): Observable<Devices> {
    return this.http
      .get<any>(`${this.API_URL}/device/list/${id}`, {
        headers: this.authService.isAuthenticated(),
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter o device por usuário', error);
          return throwError(error);
        }),
        map((response) => response.device)
      );
  }

  registerDevice(device: Devices): Observable<Devices[]> {
    return this.http
      .post<Devices[]>(`${this.API_URL}/device/register`, device, {
        headers: this.authService.isAuthenticated(),
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter o device por usuário', error);
          return throwError(error);
        })
      );
  }
  deleteById(id: string): Observable<Object> {
    return this.http
      .delete<Object>(`${this.API_URL}/device/delete/${id}`, {
        headers: this.authService.isAuthenticated(),
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter o device por usuário', error);
          return throwError(error);
        })
      );
  }

  updateDevice(id: string, device: Devices): Observable<Object> {
    return this.http
      .put(`${this.API_URL}/device/update/${id}`, device, {
        headers: this.authService.isAuthenticated(),
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter o device por usuário', error);
          return throwError(error);
        })
      );
  }

  getDeviceByQuery(query: string): Observable<Devices[]> {
    return this.http
      .get<Devices[]>(`${this.API_URL}/device/search/${query}`, {
        headers: this.authService.isAuthenticated(),
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter o device por usuário', error);
          return throwError(error);
        }),
        map((response) => response)
      );
  }
}
