import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  uri = 'http://localhost:4000/code';
  TOKEN_NAME = 'jwt_token';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  async addCode(code_id, code_name, code_desc) {
    const obj = {
      userid: this.jwtHelper.decodeToken(this.getToken()).userid,
      code_id: code_id,
      code_name: code_name,
      code_desc: code_desc
    };
    await this.http.post(`${this.uri}/add`, obj)
        .toPromise();
  }

  getCode() {
    return this.http.post(`${this.uri}`, {userid: this.jwtHelper.decodeToken(this.getToken()).userid});
  }

  editCode(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
  }

  async updateCode(code_id, code_name, code_desc, id) {

    const obj = {
      code_id: code_id,
      code_name: code_name,
      code_desc: code_desc
    };
    await this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .toPromise();
  }

  deleteCode(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }
}
