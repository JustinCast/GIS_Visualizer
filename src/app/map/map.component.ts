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
    let body = {
      schema: "public",
      geotabla: "fincastec"
    };
    this.db.updateShapes(layer, body);
  }
  ngAfterViewInit() {
    // initializing the function
    let svgPanZoom: SvgPanZoom.Instance = SvgPanZoom("#misvg", {
      viewportSelector: ".svg-pan-zoom_viewport",
      panEnabled: true,
      controlIconsEnabled: false,
      zoomEnabled: true,
      dblClickZoomEnabled: true,
      mouseWheelZoomEnabled: true,
      preventMouseEventsDefault: true,
      zoomScaleSensitivity: 0.2,
      minZoom: 0.5,
      maxZoom: 10,
      fit: true,
      contain: false,
      center: true,
      refreshRate: "auto",
      beforeZoom: function() {},
      onZoom: function() {},
      beforePan: function() {},
      onPan: function() {},
      onUpdatedCTM: function() {},
      eventsListenerElement: null
    });
    /* see typing definiton for more APIs. */
  }
}
