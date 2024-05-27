import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, first, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ result: any, status: string }> {
    return this.http.post<{ result: any, status: string }>(`${environment.apiUrl}/api/users/sign-in/`, { email, password });
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/api/users/sign-out/`, {});
  }

  getUser() {
    return this.http.get(`${environment.apiUrl}/api/users/me/`);
  }

  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
