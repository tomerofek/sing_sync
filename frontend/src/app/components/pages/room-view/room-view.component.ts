import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueueService } from 'src/app/services/queue.service';
import { ResponseService } from 'src/app/services/response.service';
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
  responseService!: ResponseService;

  constructor(activatedRoute:ActivatedRoute, roomService:RoomService, responseService:ResponseService,
    songService:SongService, queueService:QueueService, private router: Router) { 
      activatedRoute.params.subscribe((params) => {
        if(params.roomid) this.room_id = params.roomid;
      });
    this.songService = songService;
    this.queueService = queueService;
    this.responseService = responseService;
    let res: Response<void> | null = null;
    roomService.join_room(this.room_id).subscribe(data => res = {...data});
    //TODO: place holder for now, need to show error message
    if(res === null || responseService.isError(res)){
      this.router.navigateByUrl('');
    }
    let songRes: Response<Song> | null = null;
    songService.get_song(this.room_id).subscribe(data => songRes = {...data});
    //TODO: display error message
    if(songRes === null || responseService.isError(songRes)){
      
    }
    else{
      this.song = responseService.getContent(songRes);
    }
    let queueRes: Response<Song[]> | null = null;
    queueService.get_top_queue(this.room_id).subscribe(data => queueRes = {...data});
    //TODO: display error message
    if(queueRes === null || responseService.isError(queueRes)){
      
    }
    else{
      this.top_queue = responseService.getContent(queueRes);
    }
    this.current_song_part_index = this.getCurrentSongPartIndex();
  }

  ngOnInit(): void {
  }

  next_lines():void{
    let linesRes: Response<number> | null = null;
    this.songService.advance_position(this.room_id).subscribe(data => linesRes = {...data});
    //TODO
    if(linesRes === null || this.responseService.isError(linesRes)){
      
    }
    else{
      this.current_song_part_index = this.responseService.getContent(linesRes);
    }
    /*if(this.current_song_part_index != undefined)
      this.current_song_part_index++;*/
    
  }

  prev_lines():void{
    let linesRes: Response<number> | null = null;
    this.songService.previous_position(this.room_id).subscribe(data => linesRes = {...data});
    //TODO
    if(linesRes === null || this.responseService.isError(linesRes)){
      
    }
    else{
      this.current_song_part_index = this.responseService.getContent(linesRes);
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
      if(songRes === null || this.responseService.isError(songRes)){
        
      }
      else{
        this.song = this.responseService.getContent(songRes);
      }
      let linesRes: Response<number> | null = null;
      this.songService.get_position(this.room_id).subscribe(data => linesRes = {...data});
      //TODO: display error message
      if(linesRes === null || this.responseService.isError(linesRes)){
        
      }
      else{
        this.current_song_part_index = this.responseService.getContent(linesRes);
      }
      let queueRes: Response<Song[]> | null = null;
      this.queueService.get_top_queue(this.room_id).subscribe(data => queueRes = {...data});
      //TODO: display error message
      if(queueRes === null || this.responseService.isError(queueRes)){
        
      }
      else{
        this.top_queue = this.responseService.getContent(queueRes);
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
    if(linesRes === null || this.responseService.isError(linesRes)){
      return 0;
    }
    else{
      return <number>this.responseService.getContent(linesRes);
    }
  }

  onLastSongPart(){
    this.is_last_song_part = true;
  }

  onSongAdd(){
    if(!this.song){
      let songRes: Response<Song> | null = null;
      this.songService.get_song(this.room_id).subscribe(data => songRes = {...data});
      //TODO: display error message
      if(songRes === null || this.responseService.isError(songRes)){
      
      }
      else{
        this.song = this.responseService.getContent(songRes);
      }
    }
    if(this.top_queue && this.top_queue.length<2){
      let queueRes: Response<Song[]> | null = null;
      this.queueService.get_top_queue(this.room_id).subscribe(data => queueRes = {...data});
      //TODO: display error message
      if(queueRes === null || this.responseService.isError(queueRes)){
      
      }
      else{
        this.top_queue = this.responseService.getContent(queueRes);
      }
    }
  }
  
  

}
