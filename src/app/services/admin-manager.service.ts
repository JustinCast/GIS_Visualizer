import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Permission } from '../models/permission';

@Injectable({
    providedIn: 'root'
  })

export class adminManagerService {
  userTableSize:Array<any> = [];
  indexTableSize:Array<any> = [];
  tables: Array<any> = [];
  users:Array<any> = [];
  tableSize:Array<any> = [];;

  constructor(private _http: HttpClient){}

  getAllTables(){
    this._http.get<any>(`${environment.SERVER_BASE_URL}getTables`)
    .subscribe(
      data => this.tables = data,
      (err: HttpErrorResponse) => {
        this.errorHandler(err);
      }
    );
  }

  getUserTableSize(tableName:String){
    this._http.get<any>(`${environment.SERVER_BASE_URL}getTableSize/${tableName}`)
    .subscribe(
      data => this.userTableSize=data,
      (err: HttpErrorResponse) => {
        this.errorHandler(err);
      }
    );
  }

  postPermissionsTables(permission:Permission){
    this._http.
    post(`${environment.SERVER_BASE_URL}postPermissionsTables`,permission)
    .subscribe(
      () => {
        (err: HttpErrorResponse) => {
          this.errorHandler(err);
        }
      },
      
    );
  }

  getTableSize(tableName:String){
    this._http.get<any>(`${environment.SERVER_BASE_URL}getTableSize/${tableName}`)
    .subscribe(
      data => this.tableSize=data,
      (err: HttpErrorResponse) => {
        this.errorHandler(err);
      }
    );
  }

  getUsers(){
    this._http.get<any>(`${environment.SERVER_BASE_URL}getUsers`)
    .subscribe(
      data => this.users = data,
      (err: HttpErrorResponse) => {
        this.errorHandler(err);
      }
    );
  }


  errorHandler(err: HttpErrorResponse) {
      if (err.error instanceof Error) {
        // Error del lado del cliente
        console.log("An error occurred:", err.error.message);
      } else {
        // Error del lado del backend
        console.log(
          `Backend returned code ${err.status}, body was: ${JSON.stringify(
            err.error
          )}`
        );
      }
  }
}

