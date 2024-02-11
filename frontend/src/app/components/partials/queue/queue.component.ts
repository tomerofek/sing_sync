import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueueViewComponent } from '../../pages/queue-view/queue-view.component';


@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  topOfQ : songDemo[] = [];
  firstInQ;
  secondInQ;

  constructor(private dialog: MatDialog) {
    this.topOfQ = [ new songDemo('יסמין', 'הפיל הכחול'),
                    new songDemo('ערק', 'פאר טסי')];

    this.firstInQ = this.topOfQ.shift();
    this.secondInQ = this.topOfQ.shift();
    
  }

  ngOnInit(): void {
  }

  showQueueDialog(): void {
    this.dialog.open(QueueViewComponent);
  }

  showAddSongDialog(): void {
  }

}

class songDemo {
  name: string = '';
  author: string = '';

  constructor(name : string, author : string){
    this.name = name;
    this.author = author;
  }
}
