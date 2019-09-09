import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GroupService} from '../../service/group.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {

  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gs: GroupService,
    private router: Router) {

  }

  createForm() {
    this.angForm = this.fb.group({
      group_id: ['', Validators.required ],
      group_name: ['', Validators.required ],
      code_ids: ['', Validators.required ]
    });
  }

  async addGroup(group_id, group_name, code_ids) {
    const code_id_list: String[] = code_ids.split(',');
    await this.gs.addGroup(group_id, group_name, code_id_list);
    this.router.navigate(['group']);
  }

  ngOnInit() {
  }

}
