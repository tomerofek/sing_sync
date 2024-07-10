import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueueViewComponent } from '../../pages/queue-view/queue-view.component';
import { AddSongViewComponent } from '../../pages/add-song-view/add-song-view.component';
import { Song } from 'src/app/shared/models/Song';


@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit, OnChanges {

  @Input() topOfQ? : Song[];
  @Input() room_id!: string;
  @Input() owner_perm!: boolean;
  @Output() onSongAddEvent = new EventEmitter<void>();
  @Output() queueChangedEvent = new EventEmitter<void>();
  firstInQ?: Song;
  secondInQ?: Song;

  constructor(private dialog: MatDialog) {
    //if topOfQ is undefined or dosn't have an element in a spesific index then the corresponding variable will be undefined.
    this.firstInQ = this.topOfQ?.[0];
    this.secondInQ = this.topOfQ?.[1];
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['topOfQ']){
      this.firstInQ = this.topOfQ?.[0];
      this.secondInQ = this.topOfQ?.[1];
    }
  }

  ngOnInit(): void {
  }

  showQueueDialog(): void {
    const dialogRef = this.dialog.open(QueueViewComponent, {
      data: {
        room_id: this.room_id,
        owner_perm: this.owner_perm
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.queueChangedEvent.emit();
      } 
    })
  }

  showAddSongDialog(): void {
    const dialogRef = this.dialog.open(AddSongViewComponent, {data:this.room_id});
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.onSongAddEvent.emit();
    })
  }

}
/*
class songDemo {
  name: string = '';
  author: string = '';

  constructor(name : string, author : string){
    this.name = name;
    this.author = author;
  }
}
*/