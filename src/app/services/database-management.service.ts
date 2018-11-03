import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Conn } from "../models/conn";

@Injectable({
  providedIn: "root"
})
export class DatabaseManagementService {
  constructor(private _http: HttpClient) {}

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
