import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Conn } from "../models/conn";
import { WorkSpace } from "../models/workspace";

@Injectable({
  providedIn: "root"
})
export class DatabaseManagementService implements OnInit {
  ws = new WorkSpace();
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

  updateShapes(conn: Conn) {
    this._http.get(
      `http://localhost:3000?host=${conn.host}&port=${conn.port}&
      dbname=${conn.dbname}&user=${conn.user}&password=
      ${conn.password}&geotable=${conn.geoTable}&schema=${conn.schema}`
    )
    .subscribe(
      success => console.log(success),
      (err: HttpErrorResponse) => this.errorHandler(err)
    );
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
