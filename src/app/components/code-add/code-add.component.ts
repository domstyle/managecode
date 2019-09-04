import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CodeService } from 'src/app/service/code.service';

@Component({
  selector: 'app-code-add',
  templateUrl: './code-add.component.html',
  styleUrls: ['./code-add.component.css']
})
export class CodeAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cs: CodeService
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      code_id: ['', Validators.required ],
      code_name: ['', Validators.required ],
      code_desc: ['', Validators.required ]
    });
  }

  addCode(code_id, code_name, code_desc) {
    this.cs.addCode(code_id, code_name, code_desc);
  }

  ngOnInit() {
  }

}
