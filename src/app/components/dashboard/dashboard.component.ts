import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {UserService} from '../../service/user.service';

interface Header {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  header: Header;
  userid: string;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private as: AuthService,
    private us: UserService
  ) { }

  ngOnInit() {
    this.header = this.route.snapshot.data as Header;
    this.userid = this.as.getUserid();

    this.us.getUsers().subscribe(users => this.users = users);
  }

  signout() {
    this.as.signout();
    this.router.navigate(['signin']);
  }
}
