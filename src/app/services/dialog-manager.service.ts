import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { LoginLocalDBComponent } from '../login-local-db/login-local-db.component';
import { StatisticComponent } from '../statistic/statistic.component';
import { PermitsComponent } from '../permits/permits.component';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(public dialog: MatDialog) { }

  openConnectionDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
      height: '80%',
      panelClass: 'dialog'
    });

    return dialogRef.afterClosed();
  }

  openLocalConnection() {
    const dialogRef = this.dialog.open(LoginLocalDBComponent, {
      width: '50%',
      height: '38%',
      panelClass: 'dialog'
    });

    return dialogRef.afterClosed();
  }

  openStatisticDialog(){
    const dialogRef = this.dialog.open(StatisticComponent, {
      width: '30',
      height: '80%',
      panelClass: 'dialog'
    });

    return dialogRef.afterClosed();
  }

  openPermitsDialog(){
    const dialogRef = this.dialog.open(PermitsComponent, {
      width: '60%',
      height: '80%',
      panelClass: 'dialog'
    });

    return dialogRef.afterClosed();
  }
}
