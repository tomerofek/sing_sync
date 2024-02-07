import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  firstInQ = 'יסמין - הפיל הכחול';
  secondInQ = 'ערק - פאר טסי'

  constructor() { }

  ngOnInit(): void {
  }

  showQueueDialog(): void {
  }

  showAddSongDialog(): void {
  }

}
