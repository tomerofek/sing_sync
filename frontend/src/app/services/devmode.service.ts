import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevmodeService {

  constructor() { }

  // set this to true to test ui without backend
  // and false to test with backend
  isDevMode(): boolean {
    return false;
  }
}
