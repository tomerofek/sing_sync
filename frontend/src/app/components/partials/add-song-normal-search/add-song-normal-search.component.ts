import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    this.results = this.generateResults();
    this.found_results = this.results.length !== 0
    this.name_input = ''; this.author_input = '';
  }

  addSongToQ(song: Song){
    let res: Response<void> | null = null;
    this.queueService.add_song_to_queue(this.room_id,song.song_name,song.song_author).subscribe(data => res = {...data});
    //TODO: display error message
    if(res === null || this.responseService.isError(res)){
      
    } else{
      //TODO: display success message
      this.onSongAddEvent.emit();
    }
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




  //todo: change this to a service function call
  private generateResults(): Song[]{
    let name: string = this.name_input === '' ? '$' : this.name_input;
    let author: string = this.author_input === '' ? '$' : this.author_input;
    let songRes: Response<Song[]> | null = null;
    this.queueService.search_song_from_db(name,author).subscribe(data => songRes = {...data});
    //TODO: display error message
    if(songRes === null || this.responseService.isError(songRes)){
      return [];
    }
    else{
      return this.responseService.getContent(songRes) ?? [];
    }
  }

}
