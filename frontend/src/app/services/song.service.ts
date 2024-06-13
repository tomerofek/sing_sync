import { Injectable } from '@angular/core';
import { Song } from '../shared/models/Song';
import { SongLine } from '../shared/models/SongLine';
import { HttpClient } from '@angular/common/http';
import { Response } from '../shared/models/Response';
import { GET_SONG_URL, GET_POSITION, ADVANCE_POSITION, PREVIOUS_POSITION, ADVANCE_SONG, SEND_HELLO_URL } from '../shared/constants/url';
import { Observable, of } from 'rxjs';
import { DevmodeService } from './devmode.service';

export interface ISongService{
  
  get_song(room_id:string): Observable<Response<Song>>;

  get_position(room_id:string): Observable<Response<number>>;

  advance_position(room_id:string): Observable<Response<number>>;

  previous_position(room_id:string): Observable<Response<number>>;

  advance_song(room_id:string): Observable<Response<Song>>;
  
  separate_song_body(song: Song) : Song;


  generate_test_Song():Song;

  sendHello(message:string, room_id:string): void;
}

@Injectable({
  providedIn: 'root'
})
export class SongService implements ISongService {
  private real: ISongService | null;
  private fake: ISongService;
  constructor(private httpClient:HttpClient, devModeService: DevmodeService) {
    this.real = devModeService.isDevMode() ? null : new RealSongService(httpClient);
    this.fake = new FakeSongService();
   }
  
  //  send hello to server
  sendHello(message: string, room_id: string) {
    if(this.real !== null){
      this.real.sendHello(message, room_id);
    }
    else{
      this.fake.sendHello(message, room_id);
    }
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

  separate_song_body(song: Song): Song{   
    console.log('called here')
    if(song.song_parted_body || !song.song_body)
      return song;
    
    let max_visible_lines = 12;
    let min_visible_lines = 6;
    song.song_parted_body = [];
    
    let current_part : SongLine[] = [];
    let last_line : SongLine;
    song.song_body.forEach(line => {
      //should not add emplty lines at the start of a part
      if(!(current_part.length == 0 && this.isEmptyLine(line))){
        //can/should add the line to the current part
        if(current_part.length < min_visible_lines || last_line.type == 'chords' ||
        (!this.isEmptyLine(line) && current_part.length < max_visible_lines))
        current_part.push(line);
        
        else{
          song.song_parted_body?.push(current_part);
          current_part = this.isEmptyLine(line) ? [] : [line];
        }
        
        if(!this.isEmptyLine(line))
          last_line = line;
      }
    });

    if(current_part.length > 0)
        song.song_parted_body?.push(current_part);
      
    return song;
  }

  private isEmptyLine(line: SongLine) : boolean{
      return line.content == undefined || line.content == '';
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

  //  send hello to server
  sendHello(message: string, room_id: string) {
    this.httpClient.post(SEND_HELLO_URL+ room_id, { message: message })
        .subscribe(response => {
            console.log(response);
        });
  }

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

  separate_song_body(song: Song): Song{   
    if(song.song_parted_body || !song.song_body)
        return song;

    let max_visible_lines = 12;
    let min_visible_lines = 6;
    song.song_parted_body = [];

    let current_part : SongLine[] = [];
    let last_line : SongLine;
    song.song_body.forEach(line => {
      //should not add emplty lines at the start of a part
      if(!(current_part.length == 0 && this.isEmptyLine(line))){
        //can/should add the line to the current part
        if(current_part.length < min_visible_lines || last_line.type == 'chords' ||
            (!this.isEmptyLine(line) && current_part.length < max_visible_lines))
                current_part.push(line);
                
        else{
            song.song_parted_body?.push(current_part);
            current_part = this.isEmptyLine(line) ? [] : [line];
        }

        if(!this.isEmptyLine(line))
            last_line = line;
      }
    });

    if(current_part.length > 0)
        song.song_parted_body?.push(current_part);
      
    return song;
  }

  private isEmptyLine(line: SongLine) : boolean{
      return line.content == undefined || line.content == '';
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
  
  sendHello(message: string, room_id: string): void {
    
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

  separate_song_body(song: Song): Song{
    if(song.song_parted_body || !song.song_body)
      return song;

    let max_visible_lines = 12;
    let min_visible_lines = 6;
    song.song_parted_body = [];

    let current_part : SongLine[] = [];
    let last_line : SongLine;
    song.song_body.forEach(line => {
      //should not add emplty lines at the start of a part
      if(!(current_part.length == 0 && this.isEmptyLine(line))){
        //can/should add the line to the current part
        if(current_part.length < min_visible_lines || last_line.type == 'chords' ||
            (!this.isEmptyLine(line) && current_part.length < max_visible_lines))
                current_part.push(line);
                
        else{
            song.song_parted_body?.push(current_part);
            current_part = this.isEmptyLine(line) ? [] : [line];
        }

        if(!this.isEmptyLine(line))
            last_line = line;
      }
    });

    if(current_part.length > 0)
        song.song_parted_body?.push(current_part);
      
    return song;
  }

  private isEmptyLine(line: SongLine) : boolean{
    return line.content == undefined || line.content == '';
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