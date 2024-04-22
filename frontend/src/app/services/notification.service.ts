import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


  openSnackBar(snackBar: MatSnackBar, message: string, action?: string) {
    snackBar.open(message, action, {
      duration: 3000
    });
  }

  openSnackBarError(snackBar: MatSnackBar, message: string, action?: string) {
    snackBar.open(`Error: ${message}`, action, {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
