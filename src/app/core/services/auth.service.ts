import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public signIn(payLoad: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/signin`, payLoad).pipe(
      map((data) => {
        return console.log(data);
      }),
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }
}