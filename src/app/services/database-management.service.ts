import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Layer } from "../models/layer";
import { WorkSpace } from "../models/workspace";
import { SessionService } from "./session.service";
import { UIService } from "./ui.service";

@Injectable({
 providedIn: "root"
})
export class DatabaseManagementService implements OnInit {
 ws = new WorkSpace();
 widthSVG = 0;
 heightSVG = 0;
 loading: boolean = false;
 saving: boolean = false;
 loginFirst: boolean = false;
 constructor(
  private _http: HttpClient,
  private _session: SessionService,
  private _ui: UIService
 ) {}

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
     coords += coord[0] + "," + (this.ws.ymax - coord[1] + this.ws.ymin) + " ";
    }
    n_poly.setAttribute("points", coords);
    misvg.appendChild(n_poly);
    this.ws.capas[i].figuras.geometria[j].poligono = n_poly;
   }
  }
 }

 updateAfterFilter(ws: WorkSpace) {
  ws.capas.forEach(c => {
    this.updateShapes(c);
  });
 }

 updateShapes(layer: Layer) {
  layer.actualizarFiguras = function() {
   this.updateShapes(this);
  };

  this._http.post<any>(`http://localhost:8080/api/v1/update`, layer).subscribe(
   success => {
    this._session.actualSession(layer);
    this.loading = false;
    layer.figuras.geometria = success;
    this.ws.capas.push(layer);
    for (var i in layer.figuras.geometria) {
     layer.figuras.geometria[i].geom = layer.figuras.geometria[i].geom;
    }
    this.dibujarPoligonos();
   },
   (err: HttpErrorResponse) => this.errorHandler(err)
  );
 }

 saveWs(wsToSave: any) {
  this._http
   .post<any>(
    `http://localhost:8080/api/v1/saveWorkspace`,
    this.wsBody(wsToSave)
   )
   .subscribe(
    id => {
     this.saving = false;
     this.ws.id = id;
    },
    (err: HttpErrorResponse) => this.errorHandler(err)
   );
 }

 getWsCount(layer: Layer) {
  this._http.get<any>(`http://localhost:8080/api/v1/getWsCount/${layer.user}`).subscribe(
   count => {
    if (count) this.loadLastWs();
    //relse this.updateShapes(layer);
   },
   (err: HttpErrorResponse) => this.errorHandler(err)
  );
 }
 loadLastWs() {
  this._http.get<any[]>(`http://localhost:8080/api/v1/initial`).subscribe(
   count => {
    count.forEach(w => {
     this.updateShapes(w as Layer);
    });
   },
   (err: HttpErrorResponse) => this.errorHandler(err)
  );
 }

 wsBody(wsTosave: any): object {
  let aux: any = this.ws.capas;
  aux.geometria = [];
  return new Object({
   name: wsTosave.name,
   logged_user: this._session.getActualSession().user,
   height: this.ws.height,
   width: this.ws.width,
   x_max: this.ws.xmax,
   x_min: this.ws.xmin,
   y_max: this.ws.ymax,
   y_min: this.ws.ymin,
   description: wsTosave.description,
   date: wsTosave.date,
   capas: JSON.stringify(this.cleanGeom(this.ws.capas))
  });
 }

 cleanGeom(layers: Array<any>) {
  let l = layers;
  for (let index = 0; index < l.length; index++) {
   l[index]["figuras"] = {};
  }
  return l;
 }

 limparGeometrias() {
  for (var i in this.ws.capas) this.ws.capas[i].figuras = "";
 }

 actualizarGeometrias() {
  for (var i in this.ws.capas) this.ws.capas[i].actualizarFiguras();
 }

 init() {
  this.widthSVG = Number(document.getElementById("misvg").style.width);
  this.heightSVG = Number(document.getElementById("misvg").style.height);
 }

 errorHandler(err: HttpErrorResponse) {
  this.loading = false;
  this.saving = false;
  if (err.error instanceof Error) {
   // Error del lado del cliente
   this._ui.openSnackBar(`An error occurred: ${err.error.message}`, "Ok", 4000);
  } else {
   // The backend returned an unsuccessful response code.
   // Error del lado del backend
   this._ui.openSnackBar(
    `Backend returned code ${err.status}, body was: ${JSON.stringify(
     err.error
    )}`,
    "Ok",
    4000
   );
  }
 }
}
