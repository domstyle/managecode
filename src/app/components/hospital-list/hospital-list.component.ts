import { Component, OnInit } from '@angular/core';
import Hospital from '../../model/hospital.model';
import {HospitalService} from '../../service/hospital.service';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit {

  hospitalList: Hospital[];

  constructor(
    private hs: HospitalService
  ) { }

  async deleteHospital(id) {
    await this.hs.deleteHospital(id).subscribe(res => {
      console.log('Deleted Hospital');
    });
    document.location.reload();
  }

  ngOnInit() {
    this.hs.getHospital().subscribe((data: Hospital[]) => {
      this.hospitalList = data;
    });
  }

}
