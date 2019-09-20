import { Component, OnInit } from '@angular/core';
import Code from '../../model/code.model';
import { CodeService } from '../../service/code.service';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.css']
})
export class CodeListComponent implements OnInit {

  codeList: Code[];

  constructor(
    private cs: CodeService
  ) { }

  async deleteCode(id) {
    await this.cs.deleteCode(id).subscribe(res => {
      console.log('Deleted Code');
    });
    document.location.reload();
  }

  ngOnInit() {
    this.cs
    .getCode()
    .subscribe((data: Code[]) => {
      this.codeList = data;
  });
  }

}
