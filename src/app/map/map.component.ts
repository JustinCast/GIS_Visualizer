import { Component, OnInit } from "@angular/core";
import { DatabaseManagementService } from "../services/database-management.service";
import * as SvgPanZoom from 'svg-pan-zoom';
import { SessionService } from "../services/session.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  constructor(private db: DatabaseManagementService, private _session: SessionService) {}

  ngOnInit() {
    this.db.ngOnInit();
    if(this._session.getActualSession() !== null){
      this.db.loading = true;
      this.db.getWsCount(this._session.getActualSession());
    }
  }
  zoom() {
    // initializing the function
    let svgPanZoom: SvgPanZoom.Instance = SvgPanZoom('#misvg')
  }
}
