import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { LoginLocalDBComponent } from './login-local-db/login-local-db.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLocalDBComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    LoginComponent,
    LoginLocalDBComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
