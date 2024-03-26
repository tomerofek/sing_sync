import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit {

  current_song_part_index?: number;
  is_last_song_part?: boolean;

  constructor() { 
    this.current_song_part_index = this.getCurrentSongPartIndex();
  }

  ngOnInit(): void {
  }

  next_lines():void{
    if(this.current_song_part_index != undefined)
      this.current_song_part_index++;
    
  }

  prev_lines():void{
    if(this.current_song_part_index != undefined)
      this.current_song_part_index--;
    this.is_last_song_part = false;
  }

  //should be service call
  next_song():void{
    window.alert('requested next song');
  }

  //should be service call
  has_next_song():boolean{
    return false;
  }

  //should be a service function
  getCurrentSongPartIndex(): number{
    return 0;
  }

  onLastSongPart(){
    this.is_last_song_part = true;
  }
  
  

}
