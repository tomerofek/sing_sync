import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import { QueueService } from 'src/app/services/queue.service';
import { ResponseService } from 'src/app/services/response.service';
import { Queue } from 'src/app/shared/models/Queue';
import { Response } from 'src/app/shared/models/Response';
import { Song } from 'src/app/shared/models/Song';

@Component({
  selector: 'app-queue-view',
  templateUrl: './queue-view.component.html',
  styleUrls: ['./queue-view.component.css']
})
export class QueueViewComponent implements OnInit {

  queue?: Queue;
  room_id!: string;

  constructor(@Inject(MAT_DIALOG_DATA) room_id: any, private queueService: QueueService, private responseService: ResponseService,
    private notificationService: NotificationService, private snackBar: MatSnackBar) {
    this.room_id = room_id;
    
  }

  ngOnInit(): void {
    let res: Response<Queue> | null = null;
    this.queueService.get_all_queue(this.room_id).subscribe(data => {res = {...data}
      console.log(res);
      if(res === null || this.responseService.isError(res)){
        console.log(res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'result is null' : this.responseService.getError(res))
      } else{
        this.queue = this.responseService.getContent(res);
        console.log(this.queue);
      }
     });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.reorder_queue(event.previousIndex, event.currentIndex);
  }

  update_queue_ui(old_position: number, new_position: number){
    if(!this.queue) return;

    //update this.queue order
    moveItemInArray(this.queue.songs_info_list, old_position, new_position);

    //moving a song that is after the one playing before the one playing
    if(old_position > this.queue.index && new_position <= this.queue.index){
      this.queue.index++;
    }
      
    //moving a song that is before the one playing after the one playing
    else if(old_position < this.queue.index && new_position >= this.queue.index){
      this.queue.index--;
    }

    //moving the song that is currently playing
    else if(old_position == this.queue.index){
      this.queue.index = new_position
    }

  }


  reorder_queue(old_position: number, new_position: number){
    //service call
    
    //on success call this function:
    this.update_queue_ui(old_position, new_position)
  }

}
