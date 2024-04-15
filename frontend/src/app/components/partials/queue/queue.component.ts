import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueueViewComponent } from '../../pages/queue-view/queue-view.component';
import { AddSongViewComponent } from '../../pages/add-song-view/add-song-view.component';
import { Song } from 'src/app/shared/models/Song';


@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @Input() topOfQ? : Song[];
  @Input() room_id!: string;
  firstInQ?: Song;
  secondInQ?: Song;

  constructor(private dialog: MatDialog) {
    if(this.topOfQ !== undefined){
      this.firstInQ = this.topOfQ.shift();
      this.secondInQ = this.topOfQ.shift();
    }
  
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.topOfQ !== undefined){
      if(this.topOfQ.length > 1){
        this.firstInQ = this.topOfQ[0];
        this.secondInQ = this.topOfQ[1];
      }
      else if(this.topOfQ.length > 0){
        this.firstInQ = this.topOfQ[0];
        this.secondInQ = undefined;
      } else{
        this.firstInQ = undefined;
        this.secondInQ = undefined;
      }
    }
  }

  ngOnInit(): void {
  }

  showQueueDialog(): void {
    this.dialog.open(QueueViewComponent, {data:this.room_id});
  }

  showAddSongDialog(): void {
    this.dialog.open(AddSongViewComponent);
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