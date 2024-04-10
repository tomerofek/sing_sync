import { Injectable } from '@angular/core';
import { Song } from '../shared/models/Song';
import { SongLine } from '../shared/models/SongLine';
import { HttpClient } from '@angular/common/http';
import { Response } from '../shared/models/Response';
import { GET_SONG_URL, GET_POSITION, ADVANCE_POSITION, PREVIOUS_POSITION, ADVANCE_SONG } from '../shared/constants/url';
import { Observable, of } from 'rxjs';

export interface ISongService{
  
  get_song(room_id:string): Observable<Response<Song>>;

  get_position(room_id:string): Observable<Response<number>>;

  advance_position(room_id:string): Observable<Response<number>>;

  previous_position(room_id:string): Observable<Response<number>>;

  advance_song(room_id:string): Observable<Response<Song>>;
  


  generate_test_Song():Song;
}

@Injectable({
  providedIn: 'root'
})
export class SongService implements ISongService {
  private real: ISongService | null;
  private fake: ISongService;
  constructor(private httpClient:HttpClient) {
    this.real = null;
    this.fake = new FakeSongService();
   }

  get_song(room_id:string): Observable<Response<Song>>{
    if(this.real !== null){
      return this.real.get_song(room_id);
    }
    return this.fake.get_song(room_id);
  }

  get_position(room_id:string): Observable<Response<number>>{
    if(this.real !== null){
      return this.real.get_position(room_id);
    }
    return this.fake.get_position(room_id);
  }

  advance_position(room_id:string): Observable<Response<number>>{
    if(this.real !== null){
      return this.real.advance_position(room_id);
    }
    return this.fake.advance_position(room_id);
  }

  previous_position(room_id:string): Observable<Response<number>>{
    if(this.real !== null){
      return this.real.previous_position(room_id);
    }
    return this.fake.previous_position(room_id);
  }

  advance_song(room_id:string): Observable<Response<Song>>{
    if(this.real !== null){
      return this.real.advance_song(room_id);
    }
    return this.fake.advance_song(room_id);
  }
  


  generate_test_song_lines():SongLine[]{
    return [
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "Am\u200e E\u200e  C\u200e         F\u200e       G\u200e       Am\u200e"),
        new SongLine("lyrics", "ראיתי בעיניך סימנים של מבוכה"),
        new SongLine("chords", "Dm\u200e E\u200e      F\u200e      G\u200e        Am\u200e"),
        new SongLine("lyrics", "שמעעתי את השקט שלפני הסערה"),
        new SongLine("chords", "Dm\u200e   C\u200e             G\u200e  Am\u200e             Dm\u200e"),
        new SongLine("lyrics", "תני לרגשות לפרוח   אהבה הושטי יד"),
        new SongLine("chords", " E\u200e              Dm\u200e  Am\u200e              Dm\u200e"),
        new SongLine("lyrics", "חבקי אותי בכל הכוח    חיים רק פעם אחת"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("lyrics", ""),
        new SongLine("lyrics", ""),
        new SongLine("chords", "|Am\u200e|F\u200e|Dm\u200e|E\u200e|Am\u200e|"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "Am\u200e E\u200e  C\u200e      F\u200e           G\u200e         Am\u200e"),
        new SongLine("lyrics", "אולי את מתביישת אולי פוחדת מאהבה מאהבה"),
        new SongLine("chords", "Dm\u200e E\u200e        F\u200e        G\u200e        Am\u200e"),
        new SongLine("lyrics", "הקשיבי ללב דלילה  אהבה הושטי יד"),
        new SongLine("chords", "Dm\u200e      C\u200e          G\u200e  Am\u200e           Dm\u200e"),
        new SongLine("lyrics", "תני לרגשות לפרוח   אהבה הושטי יד"),
        new SongLine("chords", " E\u200e              Dm\u200e  Am\u200e             Dm\u200e"),
        new SongLine("lyrics", "חבקי אותי בכל הכוח    חיים רק פעם אחת"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי")
        ];
  }

  generate_test_Song():Song{
    return new Song("יפיופה","אייל גולן", this.generate_test_song_lines());
  }
}

export class RealSongService implements ISongService {

  constructor(private httpClient:HttpClient) { }

  get_song(room_id:string): Observable<Response<Song>>{
    return this.httpClient.get<Response<Song>>(GET_SONG_URL + room_id);
  }

  get_position(room_id:string): Observable<Response<number>>{
    return this.httpClient.get<Response<number>>(GET_POSITION + room_id);
  }

  advance_position(room_id:string): Observable<Response<number>>{
    return this.httpClient.get<Response<number>>(ADVANCE_POSITION + room_id);
  }

  previous_position(room_id:string): Observable<Response<number>>{
    return this.httpClient.get<Response<number>>(PREVIOUS_POSITION + room_id);
  }

  advance_song(room_id:string): Observable<Response<Song>>{
    return this.httpClient.get<Response<Song>>(ADVANCE_SONG + room_id);
  }
  


  generate_test_song_lines():SongLine[]{
    return [
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "Am\u200e E\u200e  C\u200e         F\u200e       G\u200e       Am\u200e"),
        new SongLine("lyrics", "ראיתי בעיניך סימנים של מבוכה"),
        new SongLine("chords", "Dm\u200e E\u200e      F\u200e      G\u200e        Am\u200e"),
        new SongLine("lyrics", "שמעעתי את השקט שלפני הסערה"),
        new SongLine("chords", "Dm\u200e   C\u200e             G\u200e  Am\u200e             Dm\u200e"),
        new SongLine("lyrics", "תני לרגשות לפרוח   אהבה הושטי יד"),
        new SongLine("chords", " E\u200e              Dm\u200e  Am\u200e              Dm\u200e"),
        new SongLine("lyrics", "חבקי אותי בכל הכוח    חיים רק פעם אחת"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("lyrics", ""),
        new SongLine("lyrics", ""),
        new SongLine("chords", "|Am\u200e|F\u200e|Dm\u200e|E\u200e|Am\u200e|"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "Am\u200e E\u200e  C\u200e      F\u200e           G\u200e         Am\u200e"),
        new SongLine("lyrics", "אולי את מתביישת אולי פוחדת מאהבה מאהבה"),
        new SongLine("chords", "Dm\u200e E\u200e        F\u200e        G\u200e        Am\u200e"),
        new SongLine("lyrics", "הקשיבי ללב דלילה  אהבה הושטי יד"),
        new SongLine("chords", "Dm\u200e      C\u200e          G\u200e  Am\u200e           Dm\u200e"),
        new SongLine("lyrics", "תני לרגשות לפרוח   אהבה הושטי יד"),
        new SongLine("chords", " E\u200e              Dm\u200e  Am\u200e             Dm\u200e"),
        new SongLine("lyrics", "חבקי אותי בכל הכוח    חיים רק פעם אחת"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי")
        ];
  }

  generate_test_Song():Song{
    return new Song("יפיופה","אייל גולן", this.generate_test_song_lines());
  }
}

export class FakeSongService implements ISongService {

  constructor() { }

  get_song(room_id:string): Observable<Response<Song>>{
    throw new Error("Unimplemented");
  }

  get_position(room_id:string): Observable<Response<number>>{
    throw new Error("Unimplemented");
  }

  advance_position(room_id:string): Observable<Response<number>>{
    throw new Error("Unimplemented");
  }

  previous_position(room_id:string): Observable<Response<number>>{
    throw new Error("Unimplemented");
  }

  advance_song(room_id:string): Observable<Response<Song>>{
    throw new Error("Unimplemented");
  }
  


  generate_test_song_lines():SongLine[]{
    return [
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "Am\u200e E\u200e  C\u200e         F\u200e       G\u200e       Am\u200e"),
        new SongLine("lyrics", "ראיתי בעיניך סימנים של מבוכה"),
        new SongLine("chords", "Dm\u200e E\u200e      F\u200e      G\u200e        Am\u200e"),
        new SongLine("lyrics", "שמעעתי את השקט שלפני הסערה"),
        new SongLine("chords", "Dm\u200e   C\u200e             G\u200e  Am\u200e             Dm\u200e"),
        new SongLine("lyrics", "תני לרגשות לפרוח   אהבה הושטי יד"),
        new SongLine("chords", " E\u200e              Dm\u200e  Am\u200e              Dm\u200e"),
        new SongLine("lyrics", "חבקי אותי בכל הכוח    חיים רק פעם אחת"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("lyrics", ""),
        new SongLine("lyrics", ""),
        new SongLine("chords", "|Am\u200e|F\u200e|Dm\u200e|E\u200e|Am\u200e|"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "Am\u200e E\u200e  C\u200e      F\u200e           G\u200e         Am\u200e"),
        new SongLine("lyrics", "אולי את מתביישת אולי פוחדת מאהבה מאהבה"),
        new SongLine("chords", "Dm\u200e E\u200e        F\u200e        G\u200e        Am\u200e"),
        new SongLine("lyrics", "הקשיבי ללב דלילה  אהבה הושטי יד"),
        new SongLine("chords", "Dm\u200e      C\u200e          G\u200e  Am\u200e           Dm\u200e"),
        new SongLine("lyrics", "תני לרגשות לפרוח   אהבה הושטי יד"),
        new SongLine("chords", " E\u200e              Dm\u200e  Am\u200e             Dm\u200e"),
        new SongLine("lyrics", "חבקי אותי בכל הכוח    חיים רק פעם אחת"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "יפיופה    בואי")
        ];
  }

  generate_test_Song():Song{
    return new Song("יפיופה","אייל גולן", this.generate_test_song_lines());
  }
}