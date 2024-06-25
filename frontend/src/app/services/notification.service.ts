import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


  openSnackBar(snackBar: MatSnackBar, message: string) {
    snackBar.open(message, undefined, {
      duration: 3000
    });
  }

  openSnackBarError(snackBar: MatSnackBar, message: string) {
    snackBar.open(`Error: ${message}`, undefined, {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  openSnackBarWithAction(snackBar: MatSnackBar, message: string, action: string, onAction: () => void){
    let snackBarRef = snackBar.open(message, action, {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => onAction());
  }
}
