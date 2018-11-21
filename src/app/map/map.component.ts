import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DatabaseManagementService } from "../services/database-management.service";
import { Layer } from "../models/layer";
import { SessionService } from "../services/session.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private db: DatabaseManagementService, private _session: SessionService) {}

  ngOnInit() {
    this.db.ngOnInit();
    if(this._session.getActualSession() !== null){
      this.db.loading = true;
      this.db.getWsCount(this._session.getActualSession());
    }
  }
  ngAfterViewInit() {
  }
}
