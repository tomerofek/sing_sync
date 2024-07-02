import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class QueueViewComponent implements OnInit, AfterViewInit, AfterViewChecked {

  queue?: QueueWithChecked;
  room_id!: string;
  changed_flag: boolean = false;
  owner_perm!: boolean;
  private _editmode!: boolean;
  
  get editmode(): boolean {
    return this._editmode;
  }

  set editmode(value: boolean) {
    this._editmode = value;
    this.scrollPending = true; // Set flag to indicate scroll is needed
    this.cdr.detectChanges(); // Trigger change detection
  }

  private scrollPending: boolean = false;


  constructor(public dialogRef: MatDialogRef<QueueViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{room_id: string, owner_perm: boolean}, private queueService: QueueService, private responseService: ResponseService,
    private notificationService: NotificationService, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
    this.room_id = data.room_id;
    this.owner_perm = data.owner_perm;
  }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.onClose();
    });
    this.editmode = false;
    this.loadQueue();
  }

  ngAfterViewInit(): void {
    // Initial scroll after view is initialized
    this.scrollPending = true;
  }

  ngAfterViewChecked(): void {
    if (this.scrollPending) {
      this.scrollPending = false; // Reset flag
      this.scrollToIndex(this.queue ? this.queue.index : 0);
    }
  }

  scrollToIndex(index: number){
    const element = document.getElementById(`song${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  loadQueue(){
    let res: Response<Queue> | null = null;
    this.queueService.get_all_queue(this.room_id).subscribe(data => {res = {...data}
      if(res === null || this.responseService.isError(res)){
        console.log('error in getting all queue:',res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'היתה בעיה בלקבל את רשימת ההשמעה' : this.responseService.getError(res))
      } else{
        
        var tempQueue = this.responseService.getContent(res);
        if(tempQueue){
          this.queue = new QueueWithChecked(tempQueue);
        }
        else{
          this.queue = undefined;
        }
        //console.log(this.queue);
        //console.log(`scroll: ${this.scrollPending}`);
        this.scrollPending = true;
        this.cdr.detectChanges();
      }
     });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.reorder_queue(event.previousIndex, event.currentIndex);
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
      if(res === null || this.responseService.isError(res)){
        console.log('error in reorder_queue:',res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'היתה בעיה בלשנות את סדר רשימת ההשמעה' : this.responseService.getError(res))
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
      if(res === null || this.responseService.isError(res)){
        console.log('error in remove song',res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'היתה בעיה למחוק את השירים מרשימת ההשמעה' : this.responseService.getError(res))
      } else{

        //on success:
        var resIndex: number | undefined = this.responseService.getContent(res);
        if(this.queue && resIndex != undefined){
          this.queue.index = resIndex;
          this.queue.songs_info_list = this.queue.songs_info_list.filter(((song, index) => !toRemove.includes(index)))
          this.changed_flag = true;

        }
      }
    });      
  }

  onClose(){
    this.dialogRef.close(this.changed_flag);
  }
}


