import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  public signIn(payLoad: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.url}/signin`, payLoad)
      .pipe(
        map((data) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', data.token);

          return this.router.navigate(['admin']);
        }),
        catchError((err) => {
          if (err.error.message) {
            return throwError(() => err.error.message);
          }

          return throwError(
            () =>
              'We are currently unable to validate the data, please try again later...'
          );
        })
      );
  }

  public signOut() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  public isAuthenticated(): Boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    const jwtHelper = new JwtHelperService();

    return !jwtHelper.isTokenExpired(token);
  }
}
