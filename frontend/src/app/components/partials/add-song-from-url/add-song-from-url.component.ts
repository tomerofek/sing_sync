import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-song-from-url',
  templateUrl: './add-song-from-url.component.html',
  styleUrls: ['./add-song-from-url.component.css']
})
export class AddSongFromUrlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  importSongFromURL(url: string){
    window.alert('retriving song parts from the url:\n' + url);
  }

}
