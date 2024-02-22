import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_CUSTOM_SONG, ADD_SONG_TO_QUEUE, GET_ALL_QUEUE, GET_SONG_FROM_URL, GET_TOP_QUEUE, REMOVE_SONG_FROM_QUEUE, REORDER_QUEUE, SEARCH_SONG_FROM_DB } from '../shared/constants/url';
import { Song } from '../shared/models/Song';
import { Response } from '../shared/models/Response';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

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
