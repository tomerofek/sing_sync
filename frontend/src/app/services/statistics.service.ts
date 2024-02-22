import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../shared/models/Song';
import { Response } from '../shared/models/Response';
import { GET_WEEKLY_TOP_10 } from '../shared/constants/url';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient:HttpClient) { }

  get_weekly_top_10(): Observable<Response<Song[]>>{
    return this.httpClient.get<Response<Song[]>>(GET_WEEKLY_TOP_10);
  }
}
