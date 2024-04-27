import { Injectable } from '@angular/core';
import { Response } from '../shared/models/Response';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor() { }

  isError(response:Response<any>|undefined):boolean{
    return response === null || response===undefined || response.status!="ok";
  }

  getContent<T>(response:Response<T>):T|undefined{
    return response.content;
  }

  getError(response:Response<any>):string{
    return <string> (response.error ?? '')
  }
}
