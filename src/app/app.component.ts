import { Component } from '@angular/core';
import { DialogManagerService } from './services/dialog-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private dialogManager: DialogManagerService){}

  openConnectionDialog() {
    this.dialogManager.openConnectionDialog();
  }

  openLocal() {
    this.dialogManager.openLocalConnection();
  }
}
