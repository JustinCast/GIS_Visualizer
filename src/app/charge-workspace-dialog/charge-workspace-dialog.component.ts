import { Component, OnInit } from '@angular/core';
import { MatRadioGroup } from '@angular/material';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-charge-workspace-dialog',
  templateUrl: './charge-workspace-dialog.component.html',
  styleUrls: ['./charge-workspace-dialog.component.scss']
})
export class ChargeWorkspaceDialogComponent implements OnInit {
  value: string;
  content: string;
  constructor(private _search: SearchService) { }

  ngOnInit() {
  }

  search() {
    console.log(this.value)
    switch (this.value) {
      case "1":
        this._search.searchByDate(this.content);
        break;
      case "2":
        this._search.searchByName(this.content);
        console.log("Entró");
        break;
      case "3":
        this._search.searchByDescription(this.content);
        break;
      default:
        break;
    }
  }
}
