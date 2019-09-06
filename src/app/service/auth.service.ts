import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {Token} from '../model/token.model';
import {shareReplay, tap} from 'rxjs/operators';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appUrl = environment.apiUrl;
  TOKEN_NAME = 'jwt_token';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    console.log('[appUrl] ', this.appUrl);
  }

  signin(credential: User): Observable<Token> {
    return this.http.post<Token>(`${this.appUrl}/auth/signin`, credential)
      .pipe(
        tap(res => this.setToken(res.token)),
        shareReplay()
      );
  }

  signout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  getUserid(): string {
    return this.jwtHelper.decodeToken(this.getToken()).userid;
  }

  async signup(userid, password) {
    return await this.http.post(`${this.appUrl}/auth/signup`, {userid, password}).toPromise();
  }
}
