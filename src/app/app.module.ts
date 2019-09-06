import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeAddComponent } from './components/code-add/code-add.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import { CodeEditComponent } from './components/code-edit/code-edit.component';
import { CodeService } from './service/code.service';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { SigninComponent } from './components/signin/signin.component';
import {JwtModule} from '@auth0/angular-jwt';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeAddComponent,
    CodeListComponent,
    CodeEditComponent,
    SigninComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        // tokenGetter: () => {
        //   return localStorage.getItem('access_token');
        // },
        // whitelistedDomains: ['localhost:4200'],
        // blacklistedRoutes: []
      }
    })
  ],
  providers: [
    CodeService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
