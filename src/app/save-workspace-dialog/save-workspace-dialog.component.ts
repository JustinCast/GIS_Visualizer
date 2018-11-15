import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-workspace-dialog',
  templateUrl: './save-workspace-dialog.component.html',
  styleUrls: ['./save-workspace-dialog.component.scss']
})
export class SaveWorkspaceDialogComponent implements OnInit {
  saveWsGroup: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.saveWsGroup = this._fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.saveWsGroup.value);
  }

}
