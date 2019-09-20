import {Component, Input, OnInit} from '@angular/core';
import Code from '../../model/code.model';
import {CodeService} from '../../service/code.service';

@Component({
  selector: 'app-code-search',
  templateUrl: './code-search.component.html',
  styleUrls: ['./code-search.component.css']
})
export class CodeSearchComponent implements OnInit {

  codeList: Code[];
  @Input() startWith: string;

  constructor(private cs: CodeService) { }

  ngOnInit() {
    this.cs.getCode().subscribe( (data: Code[]) => {
      this.codeList = data;
    });
  }

}
