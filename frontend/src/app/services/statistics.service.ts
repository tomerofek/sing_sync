import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../shared/models/Song';
import { Response } from '../shared/models/Response';
import { GET_WEEKLY_TOP_10 } from '../shared/constants/url';
import { Observable, of } from 'rxjs';

export interface IStatisticsService{
  get_weekly_top_10(): Observable<Response<Song[]>>;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements IStatisticsService{
  private real: IStatisticsService | null;
  private fake: IStatisticsService;
  constructor(private httpClient:HttpClient) {
    this.real = new StatisticsService(httpClient);
    this.fake = new FakeStatisticsService();
   }

  get_weekly_top_10(): Observable<Response<Song[]>>{
    if(this.real !== null){
      return this.real.get_weekly_top_10();
    }
    return this.fake.get_weekly_top_10();
  }
}

export class RealStatisticsService implements IStatisticsService{
  constructor(private httpClient:HttpClient) { }

  get_weekly_top_10(): Observable<Response<Song[]>>{
    return this.httpClient.get<Response<Song[]>>(GET_WEEKLY_TOP_10);
  }
}

export class FakeStatisticsService implements IStatisticsService{
  constructor() { }

  get_weekly_top_10(): Observable<Response<Song[]>>{
    const songs: Song[] = [
      new Song("song1", "author1"),
      new Song("song2", "author2"),
      new Song("song3", "author3"),
      new Song("song4", "author4"),
      new Song("song5", "author5"),
      new Song("song6", "author6"),
      new Song("song7", "author7"),
      new Song("song8", "author8"),
      new Song("song9", "author9"),
      new Song("song10", "author10")];
    const res: Response<Song[]> = {
      status: "ok",
      content: songs
    }
    return of(res);
  }
}
