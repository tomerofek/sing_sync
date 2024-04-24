import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
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
  found_results: boolean = true;

  constructor(private songService:SongService, private queueService:QueueService, private responseService:ResponseService,
    private snackBar: MatSnackBar, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
  }

  searchSongs() {
    let name: string = this.name_input === '' ? '$' : this.name_input;
    let author: string = this.author_input === '' ? '$' : this.author_input;
    let songRes: Response<Song[]> | null = null;
    this.queueService.search_song_from_db(name,author).subscribe(data => {
      songRes = {...data}
      // TODO: show error message
      if(songRes === null || this.responseService.isError(songRes)){
        this.results = [];
        console.log(songRes)
        this.notificationService.openSnackBarError(this.snackBar, songRes === null ? 'result is null' : this.responseService.getError(songRes))
      }
      else{
        this.results = this.responseService.getContent(songRes) ?? [];
      }

      this.found_results = this.results.length !== 0
      this.name_input = ''; this.author_input = '';
    });

    
  }

  addSongToQ(song: Song){
    let res: Response<void> | null = null;
    this.queueService.add_song_to_queue(this.room_id,song.song_name,song.song_author).subscribe(data => {
      res = {...data}
      if(res === null || this.responseService.isError(res)){
        console.log(res)
        this.notificationService.openSnackBarError(this.snackBar, res==null ? 'Error: null response' : `Error: ${this.responseService.getError(res)}`);
        
      } else{
        this.onSongAddEvent.emit();
        this.notificationService.openSnackBar(this.snackBar, `added ${song.song_name} - ${song.song_author}`);
        
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

  // TODO: search button only clickable when one of the field has length >=2 (with enter just do nothing)
}
