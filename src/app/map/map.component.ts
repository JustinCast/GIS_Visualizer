import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DatabaseManagementService } from "../services/database-management.service";
import { Layer } from "../models/conn";
import * as SvgPanZoom from "svg-pan-zoom";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private db: DatabaseManagementService) {}

  ngOnInit() {
    this.db.ngOnInit();
    let layer = new Layer();

    layer.color = "red";
    layer.transparencia = 0.6;
    layer.figuras = new Object();
    layer.schema = "public";
    layer.geotabla = "fincastec";
    this.db.updateShapes(layer);
  }
  ngAfterViewInit() {
  }
}
