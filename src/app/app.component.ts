import { Component } from "@angular/core";
import { DialogManagerService } from "./services/dialog-manager.service";
import { UIService } from "./services/ui.service";
import { SessionService } from "./services/session.service";
import { DatabaseManagementService } from "./services/database-management.service";

@Component({
 selector: "app-root",
 templateUrl: "./app.component.html",
 styleUrls: ["./app.component.scss"]
})
export class AppComponent {
 constructor(
  private dialogManager: DialogManagerService,
  private ui: UIService,
  private _session: SessionService,
  private _db: DatabaseManagementService
 ) {}

 openConnectionDialog() {
  this.dialogManager.openConnectionDialog();
 }

 openLocal() {
  this.dialogManager.openLocalConnection();
 }

 openStatisticDialog() {
  this.dialogManager.openStatisticDialog();
 }

 openPermitsDialog() {
  this.dialogManager.openPermitsDialog();
 }

 openSaveDialog() {
  console.log(this._session.getActualSession());
  if (this._session.getActualSession() !== null)
   this.dialogManager.openSaveDialog();
  else this.ui.openSnackBar("You´re not logged", "Ok", 2000);
 }
}
