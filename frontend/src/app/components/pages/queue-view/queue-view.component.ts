import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  queueService!: QueueService;
  responseService!: ResponseService;

  constructor(@Inject(MAT_DIALOG_DATA) room_id: any, queueService: QueueService, responseService: ResponseService) {
    this.room_id = room_id;
    this.queueService = queueService;
    this.responseService = responseService;
    
  }

  ngOnInit(): void {
    let res: Response<Song[]> | null = null;
    this.queueService.get_all_queue(this.room_id).subscribe(data => {res = {...data}
      //TODO: place holder for now, need to show error message
      if(res === null || this.responseService.isError(res)){
  
      } else{
        this.queue = this.responseService.getContent(res) ?? [];
      }
      if(this.queue.length > 0)
        this.currentSong = this.queue[0];
     });
  }

}
