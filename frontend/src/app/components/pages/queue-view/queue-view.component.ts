import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueueService } from 'src/app/services/queue.service';
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
  queueService!: QueueService;

  constructor(@Inject(MAT_DIALOG_DATA) room_id: any, queueService: QueueService) {
    this.room_id = room_id;
    this.queueService = queueService;
    let res: Response<Song[]> | null = null;
    queueService.get_all_queue(this.room_id).subscribe(data => res = {...data});
    //TODO: place holder for now, need to show error message
    if(res === null || (<Response<Song>>res).status != 'ok'){

    } else{
      this.queue = (<Response<Song[]>>res).content ?? [];
    }
    if(this.queue.length > 0)
      this.currentSong = this.queue[0];
   }

  ngOnInit(): void {
  }

}
