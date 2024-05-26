import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { catchError, first, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/v1/users`)
      .pipe(
        map((data: any) => data.data),
        catchError(this.handleError([]))
      );
  }

  addUser(user: User) {
    return this.http.post(`${environment.apiUrl}/v1/users`, user)
      .pipe(
        first(),
        map((data: any) => data.data),
        catchError(this.handleError(null))
      );
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${environment.apiUrl}/v1/users/${id}`, { firstName: user.firstName, lastName: user.lastName })
      .pipe(
        first(),
        map((data: any) => data.data),
        catchError(this.handleError(null))
      );
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/v1/users/${id}`);
  }

  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
