import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UIService } from './ui.service';
import { WorkSpace } from '../models/workspace';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  ws: WorkSpace;
  constructor(private _http: HttpClient, private _ui: UIService) { }
  
  searchByName(name: string) {
    this._http.get<any>(`http://localhost:8080/api/v1/searchByName/${name}`)
    .subscribe(
      result => {
        this.ws = result;
        console.log(this.ws);
      },
      (err: HttpErrorResponse) => this.errorHandler(err)
    );  
  }

  searchByDate(date: string) {
    this._http.get<any>(`http://localhost:8080/api/v1/searchByDate/${date}`)
    .subscribe(
      result => {
        this.ws = result;
        console.log(this.ws);
      },
      (err: HttpErrorResponse) => this.errorHandler(err)
    );  
  }

  searchByDescription(description: string) {
    this._http.get<any>(`http://localhost:8080/api/v1/searchByDescription/${description}`)
    .subscribe(
      result => {
        this.ws = result;
        console.log(this.ws);
      },
      (err: HttpErrorResponse) => this.errorHandler(err)
    );  
  }
  
  errorHandler(err: HttpErrorResponse) {
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
