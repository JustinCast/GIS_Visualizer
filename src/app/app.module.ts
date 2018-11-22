import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { LoginLocalDBComponent } from './login-local-db/login-local-db.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ColorPickerModule } from 'ngx-color-picker';
import { ChargeWorkspaceDialogComponent } from './charge-workspace-dialog/charge-workspace-dialog.component';
import { StatisticComponent } from './statistic/statistic.component';
import { PermitsComponent } from './permits/permits.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLocalDBComponent,
    MapComponent,
    ChargeWorkspaceDialogComponent,
    StatisticComponent,
    PermitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  entryComponents: [
    LoginComponent,
    LoginLocalDBComponent,
    ChargeWorkspaceDialogComponent,
    StatisticComponent,
    PermitsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
