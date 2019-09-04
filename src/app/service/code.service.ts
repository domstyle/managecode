import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  uri = 'http://localhost:4000/code';

  constructor(private http: HttpClient) { }

  addCode(code_id, code_name, code_desc) {
    const obj = {
      code_id: code_id,
      code_name: code_name,
      code_desc: code_desc
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getCode() {
    return this.http.get(`${this.uri}`);
  }

  editCode(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
  }

  updateCode(code_id, code_name, code_desc, id) {

    const obj = {
      code_id: code_id,
      code_name: code_name,
      code_desc: code_desc
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteCode(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }
}
