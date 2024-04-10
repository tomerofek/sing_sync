import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ADD_CUSTOM_SONG, ADD_SONG_TO_QUEUE, GET_ALL_QUEUE, GET_SONG_FROM_URL, GET_TOP_QUEUE, REMOVE_SONG_FROM_QUEUE, REORDER_QUEUE, SEARCH_SONG_FROM_DB } from '../shared/constants/url';
import { Song } from '../shared/models/Song';
import { Response } from '../shared/models/Response';

export interface IQueueService {

  get_top_queue(room_id:string): Observable<Response<Song[]>>;

  get_all_queue(room_id:string): Observable<Response<Song[]>>;

  reorder_queue(room_id:string, song_to_move_position:number, new_position:number): Observable<Response<void>>;

  remove_song_from_queue(room_id:string, song_to_remove_position:number): Observable<Response<void>>;

  search_song_from_db(song_name:string, song_author:string): Observable<Response<Song[]>>;

  add_song_to_queue(room_id:string, song_id:string): Observable<Response<void>>;

  get_song_from_url(room_id:string, song_url:string): Observable<Response<Song[]>>;

  /*
  add_custom_song(room_id:string, song:Song): Observable<Response<void>>;
  */

}


@Injectable({
  providedIn: 'root'
})
export class QueueService implements IQueueService{
  private real: IQueueService | null;
  private fake: IQueueService;
  constructor(private httpClient:HttpClient) {
    this.real = null;
    this.fake = new FakeQueueService();
   }

  get_top_queue(room_id:string): Observable<Response<Song[]>>{
    if(this.real !== null){
      return this.real.get_top_queue(room_id);
    }
    return this.fake.get_top_queue(room_id);
  }

  get_all_queue(room_id:string): Observable<Response<Song[]>>{
    if(this.real !== null){
      return this.real.get_all_queue(room_id);
    }
    return this.fake.get_all_queue(room_id);
  }

  reorder_queue(room_id:string, song_to_move_position:number, new_position:number): Observable<Response<void>>{
    if(this.real !== null){
      return this.real.reorder_queue(room_id, song_to_move_position, new_position);
    }
    return this.fake.reorder_queue(room_id, song_to_move_position, new_position);
  }

  remove_song_from_queue(room_id:string, song_to_remove_position:number): Observable<Response<void>>{
    if(this.real !== null){
      return this.real.remove_song_from_queue(room_id, song_to_remove_position);
    }
    return this.fake.remove_song_from_queue(room_id, song_to_remove_position);
  }

  search_song_from_db(song_name:string, song_author:string): Observable<Response<Song[]>>{
    if(this.real !== null){
      return this.real.search_song_from_db(song_name, song_author);
    }
    return this.fake.search_song_from_db(song_name, song_author);
  }

  add_song_to_queue(room_id:string, song_id:string): Observable<Response<void>>{
    if(this.real !== null){
      return this.real.add_song_to_queue(room_id, song_id);
    }
    return this.fake.add_song_to_queue(room_id, song_id);
  }

  get_song_from_url(room_id:string, song_url:string): Observable<Response<Song[]>>{
    if(this.real !== null){
      return this.real.get_song_from_url(room_id, song_url);
    }
    return this.fake.get_song_from_url(room_id, song_url);
  }

  /*
  add_custom_song(room_id:string, song:Song): Observable<Response<void>>{
    return this.httpClient.get<Response<void>>(ADD_CUSTOM_SONG + room_id + '/' + song);
  }
  */

}

export class RealQueueService implements IQueueService{

  constructor(private httpClient:HttpClient) { }

  get_top_queue(room_id:string): Observable<Response<Song[]>>{
    return this.httpClient.get<Response<Song[]>>(GET_TOP_QUEUE + room_id);
  }

  get_all_queue(room_id:string): Observable<Response<Song[]>>{
    return this.httpClient.get<Response<Song[]>>(GET_ALL_QUEUE + room_id);
  }

  reorder_queue(room_id:string, song_to_move_position:number, new_position:number): Observable<Response<void>>{
    return this.httpClient.get<Response<void>>(REORDER_QUEUE + room_id + '/' + song_to_move_position + '/' + new_position);
  }

  remove_song_from_queue(room_id:string, song_to_remove_position:number): Observable<Response<void>>{
    return this.httpClient.get<Response<void>>(REMOVE_SONG_FROM_QUEUE + room_id + '/' + song_to_remove_position);
  }

  search_song_from_db(song_name:string, song_author:string): Observable<Response<Song[]>>{
    return this.httpClient.get<Response<Song[]>>(SEARCH_SONG_FROM_DB + song_name + '/' + song_author);
  }

  add_song_to_queue(room_id:string, song_id:string): Observable<Response<void>>{
    return this.httpClient.get<Response<void>>(ADD_SONG_TO_QUEUE + room_id + '/' + song_id);
  }

  get_song_from_url(room_id:string, song_url:string): Observable<Response<Song[]>>{
    return this.httpClient.get<Response<Song[]>>(GET_SONG_FROM_URL + room_id + '/' + song_url);
  }

  /*
  add_custom_song(room_id:string, song:Song): Observable<Response<void>>{
    return this.httpClient.get<Response<void>>(ADD_CUSTOM_SONG + room_id + '/' + song);
  }
  */

}

export class FakeQueueService implements IQueueService{

  constructor() { }

  get_top_queue(room_id:string): Observable<Response<Song[]>>{
    throw new Error("Unimplemented");
  }

  get_all_queue(room_id:string): Observable<Response<Song[]>>{
    throw new Error("Unimplemented");
  }

  reorder_queue(room_id:string, song_to_move_position:number, new_position:number): Observable<Response<void>>{
    throw new Error("Unimplemented");
  }

  remove_song_from_queue(room_id:string, song_to_remove_position:number): Observable<Response<void>>{
    throw new Error("Unimplemented");
  }

  search_song_from_db(song_name:string, song_author:string): Observable<Response<Song[]>>{
    throw new Error("Unimplemented");
  }

  add_song_to_queue(room_id:string, song_id:string): Observable<Response<void>>{
    throw new Error("Unimplemented");
  }

  get_song_from_url(room_id:string, song_url:string): Observable<Response<Song[]>>{
    throw new Error("Unimplemented");
  }

  /*
  add_custom_song(room_id:string, song:Song): Observable<Response<void>>{
    return this.httpClient.get<Response<void>>(ADD_CUSTOM_SONG + room_id + '/' + song);
  }
  */

}


