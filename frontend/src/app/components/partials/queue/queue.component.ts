import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  firstInQ = 'יסמין - הפיל הכחול';
  secondInQ = 'ערק - פאר טסי'

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nav2queue(): void {
    this.router.navigateByUrl('');
  }

}
