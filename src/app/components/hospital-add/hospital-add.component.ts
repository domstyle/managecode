import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HospitalService} from '../../service/hospital.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css']
})
export class HospitalAddComponent implements OnInit {

  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private hs: HospitalService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group( {
      hospital_id: ['', Validators.required ],
      hospital_name: ['', Validators.required ],
      hospital_addr: ['' ],
      hospital_desc: ['' ]
    });
  }

  async  addHospital(hospital_id, hospital_name, hospital_addr, hospital_desc) {
    await this.hs.addHospital(hospital_id, hospital_name, hospital_addr, hospital_desc);
    this.router.navigate(['hospital']);
  }

  ngOnInit() {
  }

}
