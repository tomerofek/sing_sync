import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import { QueueService } from 'src/app/services/queue.service';
import { ResponseService } from 'src/app/services/response.service';
import { Response } from 'src/app/shared/models/Response';
import { Song } from 'src/app/shared/models/Song';

@Component({
  selector: 'app-queue-view',
  templateUrl: './queue-view.component.html',
  styleUrls: ['./queue-view.component.css']
})
export class QueueViewComponent implements OnInit {

  currentSong?: Song;
  queue!: Song[];
  room_id!: string;

  constructor(@Inject(MAT_DIALOG_DATA) room_id: any, private queueService: QueueService, private responseService: ResponseService,
    private notificationService: NotificationService, private snackBar: MatSnackBar) {
    this.room_id = room_id;
    
  }

  ngOnInit(): void {
    let res: Response<Song[]> | null = null;
    this.queueService.get_all_queue(this.room_id).subscribe(data => {res = {...data}
      if(res === null || this.responseService.isError(res)){
        this.queue = []
        console.log(res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'result is null' : this.responseService.getError(res))
      } else{
        this.queue = this.responseService.getContent(res) ?? [];
      }
      if(this.queue.length > 0)
        this.currentSong = this.queue[0];
     });
  }

}
