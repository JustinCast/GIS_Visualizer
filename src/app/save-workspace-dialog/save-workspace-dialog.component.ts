import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatabaseManagementService } from "../services/database-management.service";

@Component({
 selector: "app-save-workspace-dialog",
 templateUrl: "./save-workspace-dialog.component.html",
 styleUrls: ["./save-workspace-dialog.component.scss"]
})
export class SaveWorkspaceDialogComponent implements OnInit {
 saveWsGroup: FormGroup;
 constructor(private _fb: FormBuilder, private db: DatabaseManagementService) {}

 ngOnInit() {
  this.saveWsGroup = this._fb.group({
   name: ["", Validators.required],
   date: ["", Validators.required],
   description: ["", Validators.required]
  });
 }

 onSubmit() {
  this.db.saveWs({
   name: this.saveWsGroup.get("name").value,
   date: this.saveWsGroup.get("date").value,
   description: this.saveWsGroup.get("description").value
  });
 }
}
