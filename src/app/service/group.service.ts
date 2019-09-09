import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  uri = 'http://localhost:4000/group';
  TOKEN_NAME = 'jwt_token';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  async addGroup(group_id, group_name, code_ids) {
    const obj = {
      userid: this.jwtHelper.decodeToken(this.getToken()).userid,
      group_id: group_id,
      group_name: group_name,
      code_ids: code_ids
    };
    console.log(obj);
    await this.http.post(`${this.uri}/add`, obj)
      .toPromise();
  }

  getGroup() {
    console.log("getGroup");
    return this.http.post(`${this.uri}`, {userid: this.jwtHelper.decodeToken(this.getToken()).userid});
  }

  editGroup(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  async updateGroup(group_id, group_name, code_ids, id) {

    const obj = {
      group_id: group_id,
      group_name: group_name,
      code_ids: code_ids
    };
    await this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .toPromise();
  }

  deleteGroup(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }
}
