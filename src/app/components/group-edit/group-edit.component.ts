import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Code from '../../model/code.model';
import {GroupService} from '../../service/group.service';
import {CodeService} from '../../service/code.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  angForm: FormGroup;
  codeList: Code[];
  addedCodeList: Code[] = [];
  searchCodeId: string;
  group: any = {};

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private gs: GroupService,
    private cs: CodeService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gs.editGroup(params['id']).subscribe(res => {
        this.group = res;
        this.addedCodeList = this.group.code_list;
        console.log(this.addedCodeList);
      });
    });

    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      group_id: ['', Validators.required ],
      group_name: ['', Validators.required ]
    });

    this.cs.getCode().subscribe((data: Code[]) => {
      this.codeList = data;
    });
  }

  async updateGroup(group_id, group_name) {
    const code_id_list: String[] = [];
    if ( document.forms[0].code_ids ) {
      if ( document.forms[0].code_ids.length > 1 ) {
        document.forms[0].code_ids.forEach($el => {
          code_id_list.push($el.value);
        });
      } else {
        code_id_list.push(document.forms[0].code_ids.value);
      }
    }
    this.route.params.subscribe(async params => {
      await this.gs.updateGroup(group_id, group_name, code_id_list, params['id']);
      this.router.navigate(['group']);
    });
  }

  addCode(code_id) {
    const codeListEl = document.querySelector('#code_list');
    let selectedCode: Code;
    this.codeList.forEach(code => {
      if ( code.code_id === code_id ) {
        selectedCode = code;
      }
    });
    this.addedCodeList.push(selectedCode);
  }

  deleteCode(id) {
    const idx = this.addedCodeList.findIndex(code => {
      return code._id === id;
    });
    if (idx > -1) {
      this.addedCodeList.splice(idx, 1);
    }
  }

}
