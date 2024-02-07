import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue-view',
  templateUrl: './queue-view.component.html',
  styleUrls: ['./queue-view.component.css']
})
export class QueueViewComponent implements OnInit {

  currentSong;
  queue : songDemo[] = [];

  constructor() {
    this.queue = [new songDemo("תשאירי לי מקום לחבק אותך", "אבטיפוס"),
                  new songDemo("יסמין", "הפיל הכחול"),
                  new songDemo("ערק", "פאר טסי"),
                  new songDemo("איש של לילה", "רוני דלומי")];
    this.currentSong = this.queue.shift();
   }

  ngOnInit(): void {
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
