import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueueService } from 'src/app/services/queue.service';
import { RoomService } from 'src/app/services/room.service';
import { SongService } from 'src/app/services/song.service';
import { Response } from 'src/app/shared/models/Response';
import { Song } from 'src/app/shared/models/Song';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit {

  current_song_part_index?: number;
  is_last_song_part?: boolean;
  room_id!: string;
  song?: Song;
  top_queue?: Song[];
  songService!: SongService;
  queueService!: QueueService;

  constructor(activatedRoute:ActivatedRoute, roomService:RoomService,
    songService:SongService, queueService:QueueService, private router: Router) { 
      activatedRoute.params.subscribe((params) => {
        if(params.roomid) this.room_id = params.roomid;
      });
    this.songService = songService;
    this.queueService = queueService;
      //TODO: check if we got room id
    let res: Response<void> | null = null;
    roomService.join_room(this.room_id).subscribe(data => res = {...data});
    //TODO: place holder for now, need to show error message
    if(res === null || (<Response<void>>res).status != 'ok'){
      this.router.navigateByUrl('');
    }
    let songRes: Response<Song> | null = null;
    songService.get_song(this.room_id).subscribe(data => songRes = {...data});
    //TODO: display error message
    if(songRes === null || (<Response<Song>>songRes).status != 'ok'){
      
    }
    else{
      this.song = (<Response<Song>>songRes).content;
    }
    let queueRes: Response<Song[]> | null = null;
    queueService.get_top_queue(this.room_id).subscribe(data => queueRes = {...data});
    //TODO: display error message
    if(queueRes === null || (<Response<Song[]>>queueRes).status != 'ok'){
      
    }
    else{
      this.top_queue = (<Response<Song[]>>queueRes).content;
    }
    this.current_song_part_index = this.getCurrentSongPartIndex();
  }

  ngOnInit(): void {
  }

  next_lines():void{
    let linesRes: Response<number> | null = null;
    this.songService.advance_position(this.room_id).subscribe(data => linesRes = {...data});
    //TODO
    if(linesRes === null || (<Response<number>>linesRes).status != 'ok'){
      
    }
    else{
      this.current_song_part_index = (<Response<number>>linesRes).content;
    }
    /*if(this.current_song_part_index != undefined)
      this.current_song_part_index++;*/
    
  }

  prev_lines():void{
    let linesRes: Response<number> | null = null;
    this.songService.previous_position(this.room_id).subscribe(data => linesRes = {...data});
    //TODO
    if(linesRes === null || (<Response<number>>linesRes).status != 'ok'){
      
    }
    else{
      this.current_song_part_index = (<Response<number>>linesRes).content;
    }
    /*if(this.current_song_part_index != undefined)
      this.current_song_part_index--;*/
    this.is_last_song_part = false;
  }

  //should be service call
  next_song():void{
    //window.alert('requested next song');
    if(this.has_next_song()){
      let songRes: Response<Song> | null = null;
      this.songService.advance_song(this.room_id).subscribe(data => songRes = {...data});
      //TODO: display error message
      if(songRes === null || (<Response<Song>>songRes).status != 'ok'){
        
      }
      else{
        this.song = (<Response<Song>>songRes).content;
      }
      let linesRes: Response<number> | null = null;
      this.songService.get_position(this.room_id).subscribe(data => linesRes = {...data});
      //TODO: display error message
      if(linesRes === null || (<Response<number>>linesRes).status != 'ok'){
        
      }
      else{
        this.current_song_part_index = (<Response<number>>linesRes).content;
      }
      let queueRes: Response<Song[]> | null = null;
      this.queueService.get_top_queue(this.room_id).subscribe(data => queueRes = {...data});
      //TODO: display error message
      if(queueRes === null || (<Response<Song[]>>queueRes).status != 'ok'){
        
      }
      else{
        this.top_queue = (<Response<Song[]>>queueRes).content;
      }
    }
  }

  //should be service call
  has_next_song():boolean{
    if(this.top_queue){
      return this.top_queue.length != 0;
    }
    return false;
  }

  //should be a service function
  getCurrentSongPartIndex(): number{
    let linesRes: Response<number> | null = null;
    this.songService.get_position(this.room_id).subscribe(data => linesRes = {...data});
    //TODO
    if(linesRes === null || (<Response<number>>linesRes).status != 'ok'){
      return 0;
    }
    else{
      return <number>((<Response<number>>linesRes).content);
    }
  }

  onLastSongPart(){
    this.is_last_song_part = true;
  }
  
  

}
