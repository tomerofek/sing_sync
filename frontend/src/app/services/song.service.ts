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

  private song_part!: number;
  private song_num!: number;
  constructor() {
    this.song_part = 0;
    this.song_num = 0;
   }

  get_song(room_id:string): Observable<Response<Song>>{
    if(this.song_num == 0)
      return of({status: "ok", content: this.generate_test_Song()});
    else if(this.song_num == 1)
      return of({status: "ok", content: this.generate_test_Song2()});
    else
      return of({status: "ok", content: this.generate_test_Song3()});
  }

  get_position(room_id:string): Observable<Response<number>>{
    return of({status: "ok", content: this.song_part});
  }

  advance_position(room_id:string): Observable<Response<number>>{
    this.song_part++;
    return of({status: "ok", content: this.song_part});
  }

  previous_position(room_id:string): Observable<Response<number>>{
    this.song_part--;
    return of({status: "ok", content: this.song_part});
  }

  advance_song(room_id:string): Observable<Response<Song>>{
    this.song_num++;
    this.song_part = 0;
    if(this.song_num == 1)
      return of({status: "ok", content: this.generate_test_Song2()});
    else
      return of({status: "ok", content: this.generate_test_Song3()});
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

  generate_test_song_lines2():SongLine[]{
    return [
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "2יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "2יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "Am\u200e E\u200e  C\u200e         F\u200e       G\u200e       Am\u200e"),
        new SongLine("lyrics", "2ראיתי בעיניך סימנים של מבוכה"),
        new SongLine("chords", "Dm\u200e E\u200e      F\u200e      G\u200e        Am\u200e"),
        new SongLine("lyrics", "2שמעעתי את השקט שלפני הסערה"),
        new SongLine("chords", "Dm\u200e   C\u200e             G\u200e  Am\u200e             Dm\u200e"),
        new SongLine("lyrics", "2תני לרגשות לפרוח   אהבה הושטי יד"),
        new SongLine("chords", " E\u200e              Dm\u200e  Am\u200e              Dm\u200e"),
        new SongLine("lyrics", "2חבקי אותי בכל הכוח    חיים רק פעם אחת"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "2יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "2יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "2יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "2יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("lyrics", ""),
        new SongLine("lyrics", ""),
        new SongLine("chords", "|Am\u200e|F\u200e|Dm\u200e|E\u200e|Am\u200e|"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "Am\u200e E\u200e  C\u200e      F\u200e           G\u200e         Am\u200e"),
        new SongLine("lyrics", "2אולי את מתביישת אולי פוחדת מאהבה מאהבה"),
        new SongLine("chords", "Dm\u200e E\u200e        F\u200e        G\u200e        Am\u200e"),
        new SongLine("lyrics", "2הקשיבי ללב דלילה  אהבה הושטי יד"),
        new SongLine("chords", "Dm\u200e      C\u200e          G\u200e  Am\u200e           Dm\u200e"),
        new SongLine("lyrics", "2תני לרגשות לפרוח   אהבה הושטי יד"),
        new SongLine("chords", " E\u200e              Dm\u200e  Am\u200e             Dm\u200e"),
        new SongLine("lyrics", "2חבקי אותי בכל הכוח    חיים רק פעם אחת"),
        new SongLine("lyrics", ""),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "2יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "2יפיופה    בואי נעוף הלילה לשמיים"),
        new SongLine("chords", "G\u200e                Dm\u200e                Am\u200e"),
        new SongLine("lyrics", "2יפיופה, בואי אלי  תני לי נשיקה על השפתיים"),
        new SongLine("chords", "Am\u200e          E\u200e                    G\u200e"),
        new SongLine("lyrics", "2יפיופה    בואי")
        ];
  }

  generate_test_Song2():Song{
    return new Song("2יפיופה","2אייל גולן", this.generate_test_song_lines2());
  }

  generate_test_Song3():Song{
    return new Song("3יפיופה","2אייל גולן", this.generate_test_song_lines2());
  }
}