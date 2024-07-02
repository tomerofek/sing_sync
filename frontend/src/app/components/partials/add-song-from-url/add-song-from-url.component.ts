import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import { QueueService } from 'src/app/services/queue.service';
import { ResponseService } from 'src/app/services/response.service';
import { Response } from 'src/app/shared/models/Response';
import { Song } from 'src/app/shared/models/Song';

@Component({
  selector: 'add-song-from-url',
  templateUrl: './add-song-from-url.component.html',
  styleUrls: ['./add-song-from-url.component.css']
})
export class AddSongFromUrlComponent implements OnInit {

  @Input() room_id!: string;

  url: string = '';

  constructor(private queueService: QueueService, private responseService: ResponseService, private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  
  importSongFromURL(): void{
    if(this.url.length == 0) return;

    let res: Response<Song> | null = null;
    this.queueService.get_song_from_url(this.room_id, encodeURIComponent(this.url)).subscribe(data => {
      res = {...data}
      let song: Song | undefined = this.responseService.getContent(res)
      if(res === null || this.responseService.isError(res) || song == undefined){
        console.log('error in get song from url:',res)
        this.notificationService.openSnackBarError(this.snackBar, res==null ? 'היתה בעיה להבאת השיר מקישור' : this.responseService.getError(res));
        
      } else{
        this.notificationService.openSnackBar(this.snackBar, `הוסף ${song.song_name} - ${song.song_author}`);
        
      }
    });
  }

}
