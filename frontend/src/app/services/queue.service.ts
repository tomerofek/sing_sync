import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ADD_CUSTOM_SONG, ADD_SONG_TO_QUEUE, GET_ALL_QUEUE, GET_SONG_FROM_URL, GET_TOP_QUEUE, REMOVE_SONG_FROM_QUEUE, REORDER_QUEUE, SEARCH_SONG_FROM_DB } from '../shared/constants/url';
import { Song } from '../shared/models/Song';
import { Response } from '../shared/models/Response';

export interface IQueueService {

  /**
   * return the next 2 songs in the queue (if there are less then 2 then return them)
   * @param room_id 
   */
  get_top_queue(room_id:string): Observable<Response<Song[]>>;

  /**
   * return all the next songs in the queue
   * @param room_id 
   */
  get_all_queue(room_id:string): Observable<Response<Song[]>>;

  /**
   * move the song in from an old position to the new posotion in queue
   * @param room_id 
   * @param song_to_move_position 
   * @param new_position 
   */
  reorder_queue(room_id:string, song_to_move_position:number, new_position:number): Observable<Response<void>>;

  /**
   * remove a song in the position provided from the queue
   * @param room_id 
   * @param song_to_remove_position 
   */
  remove_song_from_queue(room_id:string, song_to_remove_position:number): Observable<Response<void>>;

  /**
   * search a song with the provided data from the data base
   * @param song_name 
   * @param song_author 
   */
  search_song_from_db(song_name:string, song_author:string): Observable<Response<Song[]>>;

  /**
   * add a song to the queue
   * @param room_id 
   * @param song_id 
   */
  add_song_to_queue(room_id:string, song_id:string): Observable<Response<void>>;

  /**
   * get a song from the provided url
   * @param room_id 
   * @param song_url 
   */
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

  private queue_pos!: number;
  constructor() {
    this.queue_pos = 0;
   }

  get_top_queue(room_id:string): Observable<Response<Song[]>>{
    this.queue_pos++;
    if(this.queue_pos==1)
      return of({status: "ok", content: [new Song('שיר1','יוצר1'),new Song('שיר2','יוצר2')]});
    if(this.queue_pos==2)
      return of({status: "ok", content: [new Song('שיר2','יוצר2'), new Song('שיר3','יוצר3')]});
    if(this.queue_pos==3)
      return of({status: "ok", content: [new Song('שיר3','יוצר3')]});
    return of({status: "ok", content: []});
  }

  get_all_queue(room_id:string): Observable<Response<Song[]>>{
    if(this.queue_pos==1)
      return of({status: "ok", content: [new Song('שיר1','יוצר1'),new Song('שיר2','יוצר2'), new Song('שיר3','יוצר3')]});
    if(this.queue_pos==2)
      return of({status: "ok", content: [new Song('שיר2','יוצר2'), new Song('שיר3','יוצר3')]});
    if(this.queue_pos==3)
      return of({status: "ok", content: [new Song('שיר3','יוצר3')]});
    return of({status: "ok", content: []});
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


