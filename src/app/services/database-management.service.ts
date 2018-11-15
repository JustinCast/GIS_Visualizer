import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Layer } from "../models/conn";
import { WorkSpace } from "../models/workspace";

@Injectable({
 providedIn: "root"
})
export class DatabaseManagementService implements OnInit {
 ws = new WorkSpace();
 widthSVG = 0;
 heightSVG = 0;
 loading: boolean = false;
 saving: boolean = false;
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
  console.log(this.ws);
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

 updateShapes(layer: Layer) {
  layer.actualizarFiguras = function() {
   this.updateShapes(this);
  };
  this.ws.capas.push(layer);

  this._http.post<any>(`http://localhost:8080/api/v1/initial`, layer).subscribe(
   success => {
    this.loading = false;
    layer.figuras.geometria = success;
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
   .post<any>(`http://localhost:8080/api/v1/saveWorkspace`, this.wsBody(wsToSave))
   .subscribe(
    id => {
      this.saving = false;
     this.ws.id = id;
     console.log(id);
    },
    (err: HttpErrorResponse) => this.errorHandler(err)
   );
 }

 wsBody(wsTosave: any): object {
  let aux: any = this.ws.capas;
  aux.geometria = [];
  console.log(aux);
  return new Object({
   name: wsTosave.name,
   height: this.ws.height,
   width: this.ws.width,
   x_max: this.ws.xmax,
   x_min: this.ws.xmin,
   y_max: this.ws.ymax,
   y_min: this.ws.ymin,
   description: wsTosave.description,
   date: wsTosave.date,
   layers: JSON.stringify(this.cleanGeom(this.ws.capas))
  });
 }

 cleanGeom(layers: Array<any>) {
  let l = layers;
  for (let index = 0; index < l.length; index++) {
    l[index]["figuras"] = {}
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
