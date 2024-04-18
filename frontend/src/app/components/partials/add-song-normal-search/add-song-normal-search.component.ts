import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { QueueService } from 'src/app/services/queue.service';
import { ResponseService } from 'src/app/services/response.service';
import { SongService } from 'src/app/services/song.service';
import { Response } from 'src/app/shared/models/Response';
import { Song } from 'src/app/shared/models/Song';

@Component({
  selector: 'add-song-normal-search',
  templateUrl: './add-song-normal-search.component.html',
  styleUrls: ['./add-song-normal-search.component.css']
})
export class AddSongNormalSearchComponent implements OnInit {

  results: Song[] = [];
  name_input: string = '';
  author_input: string = '';
  search_type: string = 'name';
  @Input() room_id!: string;
  @Output() onSongAddEvent = new EventEmitter<void>();
  songService!: SongService;
  queueService!: QueueService;
  responseService!: ResponseService;
  found_results: boolean = true;

  constructor(songService:SongService, queueService:QueueService, responseService:ResponseService) {
    this.songService = songService;
    this.queueService = queueService;
    this.responseService = responseService;
  }

  ngOnInit(): void {
  }

  searchSongs() {
    let name: string = this.name_input === '' ? '$' : this.name_input;
    let author: string = this.author_input === '' ? '$' : this.author_input;
    let songRes: Response<Song[]> | null = null;
    this.queueService.search_song_from_db(name,author).subscribe(data => {
      songRes = {...data}
      //console.log(songRes)
      //console.log(this.responseService.getContent(songRes))
      //TODO: display error message
      if(songRes === null || this.responseService.isError(songRes)){
        this.results = [];
      }
      else{
        this.results = this.responseService.getContent(songRes) ?? [];
      }

      this.found_results = this.results.length !== 0
      this.name_input = ''; this.author_input = '';
    });









    /*
    this.normal_search_service_call().subscribe(data => {
      this.results = {...data}
      this.found_results = this.results.length !== 0
      this.name_input = ''; this.author_input = '';
      console.log(data);
      console.log({...data});
    })*/
    
  }

  addSongToQ(song: Song){
    let res: Response<void> | null = null;
    this.queueService.add_song_to_queue(this.room_id,song.song_name,song.song_author).subscribe(data => {
      res = {...data}
      //TODO: display error message
      if(res === null || this.responseService.isError(res)){
        
      } else{
        //TODO: display success message
        this.onSongAddEvent.emit();
      }
    });
  }

  updateSearchBar(option: string){
    this.search_type = option;
    switch(option){
      case('name'):
        this.author_input = '';
        break;
      case('author'):
        this.name_input = '';
        break;
    }
  }

  private normal_search_service_call(): Observable<Song[]>{
    return new Observable<Song[]>((observer) => {
      let name: string = this.name_input === '' ? '$' : this.name_input;
      let author: string = this.author_input === '' ? '$' : this.author_input;
      let songRes: Response<Song[]> | null = null;
      this.queueService.search_song_from_db(name,author).subscribe(data => {
        songRes = {...data}
        //console.log(songRes)
        //console.log(this.responseService.getContent(songRes))
        //TODO: display error message
        if(songRes === null || this.responseService.isError(songRes)){
          return [];
        }
        else{
          return this.responseService.getContent(songRes) ?? [];
        }
      });
    });
  }

  // TODO: search button only clickable when one of the field has length >=2 (with enter just do nothing)

}
