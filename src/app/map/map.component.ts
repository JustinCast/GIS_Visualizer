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
    if(this._session.getActualSession() === null){
      let layer = new Layer();
  
      layer.color = "red";
      layer.transparencia = 0.6;
      layer.figuras = new Object();
      layer.schema = "public";
      layer.geotabla = "fincastec";
    }else {
      this.db.loading = true;
      this.db.updateShapes(this._session.getActualSession());
    }
  }
  ngAfterViewInit() {
  }
}
