import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HospitalService} from '../../service/hospital.service';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css']
})
export class HospitalEditComponent implements OnInit {

  hospital: any = {};
  angForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hs: HospitalService,
    private fb: FormBuilder
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

  updateHospital(hospital_id, hospital_name, hospital_addr, hospital_desc) {
    this.route.params.subscribe(async  params => {
      await this.hs.updateHospital(hospital_id, hospital_name, hospital_addr, hospital_desc, params['id']);
      this.router.navigate(['hospital']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hs.editHospital(params['id']).subscribe(res => {
        this.hospital = res;
      });
    });
  }

}
