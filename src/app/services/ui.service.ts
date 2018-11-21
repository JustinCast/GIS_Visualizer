import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private _snackbar: MatSnackBar) { }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackbar.open(message, action, {
      duration: duration,
    });
}
}
