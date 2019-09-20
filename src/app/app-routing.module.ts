import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeAddComponent } from './components/code-add/code-add.component';
import { CodeEditComponent } from './components/code-edit/code-edit.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import {SigninComponent} from './components/signin/signin.component';
import {AuthGuard} from './guards/auth.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {GroupEditComponent} from './components/group-edit/group-edit.component';
import {GroupListComponent} from './components/group-list/group-list.component';
import {GroupAddComponent} from './components/group-add/group-add.component';
import {HospitalListComponent} from './components/hospital-list/hospital-list.component';
import {HospitalAddComponent} from './components/hospital-add/hospital-add.component';
import {HospitalEditComponent} from './components/hospital-edit/hospital-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard', subtitle: 'JWT Authentication' }
  },
  { path: 'register', component: RegisterComponent },
  { path: 'code/create', component: CodeAddComponent, canActivate: [AuthGuard] },
  { path: 'code/edit/:id', component: CodeEditComponent, canActivate: [AuthGuard] },
  { path: 'code', component: CodeListComponent, canActivate: [AuthGuard] },
  { path: 'group/create', component: GroupAddComponent, canActivate: [AuthGuard] },
  { path: 'group/edit/:id', component: GroupEditComponent, canActivate: [AuthGuard] },
  { path: 'group', component: GroupListComponent, canActivate: [AuthGuard] },
  { path: 'hospital/create', component: HospitalAddComponent, canActivate: [AuthGuard] },
  { path: 'hospital/edit/:id', component: HospitalEditComponent, canActivate: [AuthGuard] },
  { path: 'hospital', component: HospitalListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
