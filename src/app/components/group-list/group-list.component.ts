import { Component, OnInit } from '@angular/core';
import Group from '../../model/group.model';
import {GroupService} from '../../service/group.service';
import {CodeService} from '../../service/code.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groupList: Group[];

  constructor(private gs: GroupService, private cs: CodeService) { }

  async deleteGroup(id) {
    await this.gs.deleteGroup(id).subscribe(res => {
      console.log('Deleted');
    });
    document.location.reload();
  }

  ngOnInit() {
    this.gs.getGroup().subscribe((data: Group[]) => {
      this.groupList = data;
    });
  }

}
