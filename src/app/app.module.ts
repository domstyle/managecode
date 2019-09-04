import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeAddComponent } from './components/code-add/code-add.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import { CodeEditComponent } from './components/code-edit/code-edit.component';
import { CodeService } from './service/code.service';

@NgModule({
  declarations: [
    AppComponent,
    CodeAddComponent,
    CodeListComponent,
    CodeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
