import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JOIN_ROOM_URL, HOST_ROOM_URL } from '../shared/constants/url';
import { Response } from '../shared/models/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http_client:HttpClient) { }

  join_room(room_id:string): Observable<Response<void>>{
    return this.http_client.get<Response<void>>(JOIN_ROOM_URL + room_id);
  }

  host_room(): Observable<Response<string>>{
    return this.http_client.get<Response<string>>(HOST_ROOM_URL);
  }
}
