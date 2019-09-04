import { Component, OnInit } from '@angular/core';
import Code from '../../model/code.model';
import { CodeService } from '../../service/code.service';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.css']
})
export class CodeListComponent implements OnInit {

  code: Code[];

  constructor(
    private cs: CodeService
  ) { }

  deleteCode(id) {
    this.cs.deleteCode(id).subscribe(res => {
      console.log('Deleted');
    });
  }

  ngOnInit() {
    this.cs
    .getCode()
    .subscribe((data: Code[]) => {
      this.code = data;
  });
  }

}
