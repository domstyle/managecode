import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeAddComponent } from './components/code-add/code-add.component';
import { CodeEditComponent } from './components/code-edit/code-edit.component';
import { CodeListComponent } from './components/code-list/code-list.component';


const routes: Routes = [
  {path: 'code/create', component: CodeAddComponent},
  {path: 'code/edit/:id', component: CodeEditComponent},
  {path: 'code', component: CodeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
