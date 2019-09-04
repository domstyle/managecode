import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CodeService } from '../../service/code.service';

@Component({
  selector: 'app-code-edit',
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.css']
})
export class CodeEditComponent implements OnInit {

  code: any = {};
  angForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: CodeService,
    private fb: FormBuilder
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

  updateBusiness(code_id, code_name, code_desc) {
    this.route.params.subscribe(params => {
       this.cs.updateCode(code_id, code_name, code_desc, params['id']);
       this.router.navigate(['code']);
    });
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cs.editCode(params['id']).subscribe(res => {
        this.code = res;
      });
    });
  }

}
