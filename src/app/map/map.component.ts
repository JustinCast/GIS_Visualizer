import { Component, OnInit } from "@angular/core";
import { WorkSpace } from "../models/workspace";
import { DatabaseManagementService } from "../services/database-management.service";
import { Conn } from "../models/conn";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  ws = new WorkSpace();
  widthSVG = 0;
  heightSVG = 0;
  layerGroup: FormGroup;
  constructor(private db: DatabaseManagementService, private _fb: FormBuilder) {
    this.layerGroup = this._fb.group({

    })
  }

  ngOnInit() {
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
    actualizar_limites();

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

  cargarCapa() {
    let n_capa = new Conn();
    n_capa.host = document.getElementById("input_host").value;
    n_capa.port = document.getElementById("input_port").value;
    n_capa.dbname = document.getElementById("input_dbname").value;
    n_capa.user = document.getElementById("input_user").value;
    n_capa.password = document.getElementById("input_password").value;
    n_capa.geoTable = document.getElementById("input_tablename").value;
    n_capa.schema = document.getElementById("input_schema").value;
    n_capa.color = document.getElementById("input_color").value;
    n_capa.transparencia =
      parseInt(document.getElementById("input_opacity").value) / 100;
    n_capa.figuras = "";
    n_capa.visible = true;
    n_capa.actualizarFiguras = function() {
      actualizarFiguras(this);
    };
    this.ws.capas.push(n_capa);
    this.db.updateShapes();
  }
}
