import { Component, OnInit } from '@angular/core';
import { MatRadioGroup } from '@angular/material';

@Component({
  selector: 'app-charge-workspace-dialog',
  templateUrl: './charge-workspace-dialog.component.html',
  styleUrls: ['./charge-workspace-dialog.component.scss']
})
export class ChargeWorkspaceDialogComponent implements OnInit {
  value: number;
  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log(this.value);
  }
}
