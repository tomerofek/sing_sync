import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueueViewComponent } from '../../pages/queue-view/queue-view.component';


@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  firstInQ = 'יסמין - הפיל הכחול';
  secondInQ = 'ערק - פאר טסי'

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showQueueDialog(): void {
    this.dialog.open(QueueViewComponent);
  }

  showAddSongDialog(): void {
  }

}
