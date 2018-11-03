import { Component, OnInit } from "@angular/core";
import { WorkSpace } from "../models/workspace";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  ws = new WorkSpace();
  widthSVG = 0;
  heightSVG = 0;
  constructor() {}

  ngOnInit() {
    this.ws.xmin = 0.0;
    this.ws.ymin = 0.0;
    this.ws.xmax = 0.0;
    this.ws.ymax = 0.0;
    this.ws.width = 0.0;
    this.ws.height = 0.0;
    this.ws.factorP = 0.0;
    this.ws.capas = new Array();
  }

  actualizar_limites() {
    for (var i in this.ws.capas) {
      for (var j in this.ws.capas[i].figuras.geometria) {
        if (this.ws.xmin == 0.0 || this.ws.xmin > this.ws.capas[i].figuras.geometria[j].xmin)
        this.ws.xmin = parseFloat(this.ws.capas[i].figuras.geometria[j].xmin);
        if (this.ws.ymin == 0.0 || this.ws.ymin > this.ws.capas[i].figuras.geometria[j].ymin)
        this.ws.ymin = parseFloat(this.ws.capas[i].figuras.geometria[j].ymin);
        if (this.ws.xmax == 0.0 || this.ws.xmax < this.ws.capas[i].figuras.geometria[j].xmax)
        this.ws.xmax = parseFloat(this.ws.capas[i].figuras.geometria[j].xmax);
        if (this.ws.ymax == 0.0 || this.ws.ymax < this.ws.capas[i].figuras.geometria[j].ymax)
        this.ws.ymax = parseFloat(this.ws.capas[i].figuras.geometria[j].ymax);
      }
    }
    this.ws.width = this.ws.xmax - this.ws.xmin;
    this.ws.height = this.ws.ymax - this.ws.ymin;
    this.ws.factorP = 0.0;
    var misvg = document.getElementById("misvg");
    misvg.setAttribute(
      "viewBox",
      this.ws.xmin + " " + this.ws.ymin + " " + this.ws.width + " " + this.ws.height
    );
  }
}
