import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { LoginLocalDBComponent } from '../login-local-db/login-local-db.component';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(public dialog: MatDialog) { }

  openConnectionDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
      height: '70%',
      panelClass: 'dialog'
    });

    return dialogRef.afterClosed();
  }

  openLocalConnection() {
    const dialogRef = this.dialog.open(LoginLocalDBComponent, {
      width: '35%',
      height: '25%',
      panelClass: 'dialog'
    });

    return dialogRef.afterClosed();
  }
}
