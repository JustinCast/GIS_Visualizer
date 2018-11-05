import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Conn } from "../models/conn";
import { WorkSpace } from "../models/workspace";

@Injectable({
  providedIn: "root"
})
export class DatabaseManagementService implements OnInit {
  ws = new WorkSpace();
  widthSVG = 0;
  heightSVG = 0;
  constructor(private _http: HttpClient) {}

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
        if (
          this.ws.xmin == 0.0 ||
          this.ws.xmin > this.ws.capas[i].figuras.geometria[j].xmin
        )
          this.ws.xmin = parseFloat(this.ws.capas[i].figuras.geometria[j].xmin);
        if (
          this.ws.ymin == 0.0 ||
          this.ws.ymin > this.ws.capas[i].figuras.geometria[j].ymin
        )
          this.ws.ymin = parseFloat(this.ws.capas[i].figuras.geometria[j].ymin);
        if (
          this.ws.xmax == 0.0 ||
          this.ws.xmax < this.ws.capas[i].figuras.geometria[j].xmax
        )
          this.ws.xmax = parseFloat(this.ws.capas[i].figuras.geometria[j].xmax);
        if (
          this.ws.ymax == 0.0 ||
          this.ws.ymax < this.ws.capas[i].figuras.geometria[j].ymax
        )
          this.ws.ymax = parseFloat(this.ws.capas[i].figuras.geometria[j].ymax);
      }
    }
    this.ws.width = this.ws.xmax - this.ws.xmin;
    this.ws.height = this.ws.ymax - this.ws.ymin;
    this.ws.factorP = 0.0;
    var misvg = document.getElementById("misvg");
    misvg.setAttribute(
      "viewBox",
      this.ws.xmin +
        " " +
        this.ws.ymin +
        " " +
        this.ws.width +
        " " +
        this.ws.height
    );
  }

  dibujarPoligonos() {
    this.actualizar_limites();

    var misvg = document.getElementById("misvg");

    for (var i in this.ws.capas) {
      for (var j in this.ws.capas[i].figuras.geometria) {
        var n_poly = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polygon"
        );
        n_poly.setAttribute(
          "style",
          "fill:" + this.ws.capas[i].color + ";stroke:gray;stroke-width:1"
        );
        n_poly.setAttribute("opacity", this.ws.capas[i].transparencia);

        var geom = this.ws.capas[i].figuras.geometria[j].geom;
        var ymax = parseFloat(this.ws.capas[i].figuras.geometria[j].ymax);
        var ymin = parseFloat(this.ws.capas[i].figuras.geometria[j].ymin);
        var CRTM05coords = geom.coordinates[0][0];
        var coords = "";
        for (var k in CRTM05coords) {
          var coord = CRTM05coords[k];
          coords +=
            coord[0] + "," + (this.ws.ymax - coord[1] + this.ws.ymin) + " ";
        }
        n_poly.setAttribute("points", coords);
        misvg.appendChild(n_poly);
        this.ws.capas[i].figuras.geometria[j].poligono = n_poly;
      }
    }
  }

  updateShapes(conn: Conn) {
    conn.actualizarFiguras = function() {
      this.updateShapes(this);
    };
    this._http
      .get(
        `http://localhost:3000?host=${conn.host}&port=${conn.port}&
      dbname=${conn.dbname}&user=${conn.user}&password=
      ${conn.password}&geotable=${conn.geoTable}&schema=${conn.schema}`
      )
      .subscribe(
        success => console.log(success),
        (err: HttpErrorResponse) => this.errorHandler(err)
      );
  }

  limparGeometrias() {
    for (var i in this.ws.capas) this.ws.capas[i].figuras = "";
  }

  actualizarGeometrias() {
    for (var i in this.ws.capas) this.ws.capas[i].actualizarFiguras();
  }

  init() {
    this.widthSVG = document.getElementById("misvg").width.baseVal.value;
    this.heightSVG = document.getElementById("misvg").height.baseVal.value;
  }

  errorHandler(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      // Error del lado del cliente
      console.log("An error occurred:", err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // Error del lado del backend
      console.log(
        `Backend returned code ${err.status}, body was: ${JSON.stringify(
          err.error
        )}`
      );
    }
  }
}
