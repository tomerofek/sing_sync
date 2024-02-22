import { Injectable } from '@angular/core';
import { Song } from '../shared/models/Song';
import { SongLine } from '../shared/models/SongLine';
import { HttpClient } from '@angular/common/http';
import { Response } from '../shared/models/Response';
import { GET_SONG_URL, GET_POSITION, ADVANCE_POSITION, PREVIOUS_POSITION, ADVANCE_SONG } from '../shared/constants/url';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SongService {

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
