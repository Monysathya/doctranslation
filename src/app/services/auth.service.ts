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

  login(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/v1/auth/login`, { username, password })
      .pipe(
        first(),
        map((data: any) => data.data),
        catchError(this.handleError({}))
      );
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/v1/auth/logout`, {});
  }

  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
