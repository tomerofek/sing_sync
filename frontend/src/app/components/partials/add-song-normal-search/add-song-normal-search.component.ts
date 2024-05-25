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
  @Input() room_id!: string;
  @Output() onSongAddEvent = new EventEmitter<void>();
  @Output() moveToUrlTabEvent = new EventEmitter<void>();

  results: Song[] = [];
  search_term: string = '';
  highlight_term: string = '';
  found_results: boolean = true;

  constructor(private songService:SongService, private queueService:QueueService, private responseService:ResponseService,
    private snackBar: MatSnackBar, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
  }

  searchSongs() {
    if(this.search_term.length < 2) return;

    //update the part in the search result that is highlighted
    this.highlight_term = this.search_term;

    //calling server
    let songRes: Response<Song[]> | null = null;
    this.queueService.search_song_from_db(this.search_term).subscribe(data => {
      songRes = {...data}

      if(songRes === null || this.responseService.isError(songRes)){
        //clearing results
        this.results = [];

        //showing error msg
        console.log(songRes)
        this.notificationService.openSnackBarError(this.snackBar, songRes === null ? 'result is null' : this.responseService.getError(songRes))
      }
      else{
        //updating results
        this.results = this.responseService.getContent(songRes) ?? [];
      }

      this.found_results = this.results.length !== 0
      this.search_term = ''
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


  move_to_url_tab(){
    this.moveToUrlTabEvent.emit();
  }

  // TODO: search button only clickable when one of the field has length >=2 (with enter just do nothing)
}
