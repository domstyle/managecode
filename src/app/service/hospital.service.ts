import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  uri = 'http://localhost:4000/hospital';
  TOKEN_NAME = 'jwt_token';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  async addHospital(hospital_id, hospital_name, hospital_addr, hospital_desc) {
    const obj = {
      userid: this.jwtHelper.decodeToken(this.getToken()).userid,
      hospital_id: hospital_id,
      hospital_name: hospital_name,
      hospital_addr: hospital_addr,
      hospital_desc: hospital_desc
    };
    await  this.http.post(`${this.uri}/add`, obj).toPromise();
  }

  getHospital() {
    return this.http.post(`${this.uri}`, {userid: this.jwtHelper.decodeToken(this.getToken()).userid});
  }

  editHospital(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  async updateHospital(hospital_id, hospital_name, hospital_addr, hospital_desc, id) {
    const obj = {
      hospital_id: hospital_id,
      hospital_name: hospital_name,
      hospital_addr: hospital_addr,
      hospital_desc: hospital_desc
    };

    await this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .toPromise();
  }

  deleteHospital(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }
}
