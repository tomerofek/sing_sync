import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { JOIN_ROOM_URL, HOST_ROOM_URL, SEND_HELLO_URL, CLOSE_ROOM_URL } from '../shared/constants/url';
import { Response } from '../shared/models/Response';
import { Observable, of } from 'rxjs';

export interface IRoomService {

  join_room(room_id:string): Observable<Response<boolean>>;

  host_room(): Observable<Response<string>>;

  close_room(room_id: string): Observable<Response<void>>;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService implements IRoomService{
  private real: IRoomService | null;
  private fake: IRoomService;
  constructor(private http_client:HttpClient) {
    this.real = isDevMode() ? null : new RealRoomService(http_client);
    this.fake = new FakeRoomService();
   }
  close_room(room_id: string): Observable<Response<void>> {
    if(this.real != null){
      return this.real.close_room(room_id);
    }
    return this.fake.close_room(room_id);
  }

  join_room(room_id:string): Observable<Response<boolean>>{
    if(this.real !== null){
      return this.real.join_room(room_id);
    }
    return this.fake.join_room(room_id);
  }

  host_room(): Observable<Response<string>>{
    if(this.real !== null){
      return this.real.host_room();
    }
    return this.fake.host_room();
  }
}

export class RealRoomService implements IRoomService{

  constructor(private http_client:HttpClient) { }

  close_room(room_id: string): Observable<Response<void>> {
    console.log('client sending GET: ', CLOSE_ROOM_URL + room_id);
    return this.http_client.get<Response<void>>(CLOSE_ROOM_URL + room_id);
  }

  join_room(room_id:string): Observable<Response<boolean>>{
    return this.http_client.get<Response<boolean>>(JOIN_ROOM_URL + room_id);
  }

  host_room(): Observable<Response<string>>{
    return this.http_client.get<Response<string>>(HOST_ROOM_URL);
  }
}

export class FakeRoomService implements IRoomService{

  constructor() { }
  close_room(room_id: string): Observable<Response<void>> {
    return of({status: "ok"});
  }

  join_room(room_id:string): Observable<Response<boolean>>{
    return of({status: "ok", content:true});
  }

  host_room(): Observable<Response<string>>{
    return of({status: "ok", content:"0"});
  }
}
