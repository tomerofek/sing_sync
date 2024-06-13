import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import { QueueService } from 'src/app/services/queue.service';
import { ResponseService } from 'src/app/services/response.service';
import { Queue, QueueWithChecked } from 'src/app/shared/models/Queue';
import { Response } from 'src/app/shared/models/Response';
import { Song } from 'src/app/shared/models/Song';
import { SongWithChecked } from 'src/app/shared/models/SongWithChecked';

@Component({
  selector: 'app-queue-view',
  templateUrl: './queue-view.component.html',
  styleUrls: ['./queue-view.component.css']
})
export class QueueViewComponent implements OnInit {

  queue?: QueueWithChecked;
  room_id!: string;
  editmode!: boolean;
  changed_flag: boolean = false;

  constructor(public dialogRef: MatDialogRef<QueueViewComponent>,
    @Inject(MAT_DIALOG_DATA) room_id: any, private queueService: QueueService, private responseService: ResponseService,
    private notificationService: NotificationService, private snackBar: MatSnackBar) {
    this.room_id = room_id;
    
  }

  ngOnInit(): void {
    
    this.editmode = false;
    let res: Response<Queue> | null = null;
    this.queueService.get_all_queue(this.room_id).subscribe(data => {res = {...data}
      console.log(res);
      if(res === null || this.responseService.isError(res)){
        console.log(res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'result is null' : this.responseService.getError(res))
      } else{
        
        var tempQueue = this.responseService.getContent(res);
        if(tempQueue){
          this.queue = new QueueWithChecked(tempQueue);
        }
        else{
          this.queue = undefined;
        }
        
        console.log(this.queue);
      }
     });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.reorder_queue(event.previousIndex, event.currentIndex);
    console.log(this.queue)
  }

  getCheckedSongs() : number[]{
    if(this.queue) {
      return this.queue.songs_info_list
        .map((song, index) => song.checked ? index : -1)
        .filter(index => index !== -1);
    }
    return [];
  }

  reorder_queue(old_position: number, new_position: number){
    //service call
    let res: Response<number> | null = null;
    this.queueService.reorder_queue(this.room_id, old_position, new_position).subscribe(data => {res = {...data}
      console.log(res);
      if(res === null || this.responseService.isError(res)){
        console.log(res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'result is null' : this.responseService.getError(res))
      } else{
        //on success:
        var resIndex: number | undefined = this.responseService.getContent(res);
        if(this.queue && resIndex != undefined){
          moveItemInArray(this.queue.songs_info_list, old_position, new_position);
          this.queue.index = resIndex;
          this.changed_flag = true;
        }
          
      }
    });
  }

  remove_song_from_queue(){
    //service call that uses getCheckedSongs to remove all the selected songs.
    var toRemove : number[] = this.getCheckedSongs();
    let res: Response<number> | null = null;
    this.queueService.remove_song_from_queue(this.room_id, toRemove).subscribe(data => {res = {...data}
      console.log(res);
      if(res === null || this.responseService.isError(res)){
        console.log(res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'result is null' : this.responseService.getError(res))
      } else{

        //on success:
        var resIndex: number | undefined = this.responseService.getContent(res);
        console.log('queue:', this.queue, 'resIndex:', resIndex);
        if(this.queue && resIndex != undefined){
          this.queue.index = resIndex;
          this.queue.songs_info_list = this.queue.songs_info_list.filter(((song, index) => !toRemove.includes(index)))
          console.log('queue after remove:', this.queue);
          this.changed_flag = true;

        }
      }
    });      
  }

  onClose(){
    this.dialogRef.close(this.changed_flag);
  }
}


