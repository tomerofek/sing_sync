import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { QueueService } from 'src/app/services/queue.service';
import { ResponseService } from 'src/app/services/response.service';
import { RoomService } from 'src/app/services/room.service';
import { SongService } from 'src/app/services/song.service';
import { Response } from 'src/app/shared/models/Response';
import { Song } from 'src/app/shared/models/Song';
import { WebsocketService } from 'src/app/services/websocket.service'; // Import the SocketService

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

  constructor(activatedRoute:ActivatedRoute, private roomService:RoomService, private responseService:ResponseService,
    private songService:SongService, private queueService:QueueService, private router: Router,
    private notificationService: NotificationService, private snackBar: MatSnackBar, private socketService: WebsocketService) {
      activatedRoute.params.subscribe((params) => {
        if(params.roomid) this.room_id = params.roomid;
      });
    let res: Response<void> | null = null;
    roomService.join_room(this.room_id).subscribe(data => {res = {...data}
      if(res === null || responseService.isError(res)){
        console.log('error in getting song in constructor');
        console.log(res);
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnInit(): void {
    this.getSong();
    this.getTopQ();
    this.socketService.io_connect(this.room_id);

    this.socketService.listenForPositions();
      this.socketService.positionReceived.subscribe((num) => {
        this.current_song_part_index = num;
    });

    this.socketService.listenForBroadcasts();
      this.socketService.songReceived.subscribe((song) => {
        this.song = song;
    });

    this.socketService.listenForBroadcasts();
      this.socketService.topOfQueueReceived.subscribe((songs) => {
        this.top_queue = songs;
    });

  }

  sendHello(message: string) {
    this.songService.sendHello(message, this.room_id);
  }

  next_lines():void{
    let linesRes: Response<number> | null = null;
    this.songService.advance_position(this.room_id).subscribe(data => {linesRes = {...data}
      if(linesRes === null || this.responseService.isError(linesRes)){
        console.log('error in getting position in next_lines click');
        console.log(linesRes);
        this.notificationService.openSnackBarError(this.snackBar, linesRes === null ? 'result is null' : this.responseService.getError(linesRes))
      }
      else{
        this.current_song_part_index = this.responseService.getContent(linesRes);
      }
    });
  }

  prev_lines():void{
    let linesRes: Response<number> | null = null;
    this.songService.previous_position(this.room_id).subscribe(data => {linesRes = {...data}
      if(linesRes === null || this.responseService.isError(linesRes)){
        console.log('error in getting position in new song');
        console.log(linesRes);
        this.notificationService.openSnackBarError(this.snackBar, linesRes === null ? 'result is null' : this.responseService.getError(linesRes))
      }
      else{
        this.current_song_part_index = this.responseService.getContent(linesRes);
      }

    });
    this.is_last_song_part = false;
  }

  next_song():void{
    if(this.has_next_song()){
      let songRes: Response<Song> | null = null;
      this.songService.advance_song(this.room_id).subscribe(data => {songRes = {...data}
        if(songRes === null || this.responseService.isError(songRes)){
          console.log('error in getting song in next_song click');
          console.log(songRes);
          this.notificationService.openSnackBarError(this.snackBar, songRes === null ? 'result is null' : this.responseService.getError(songRes))
        }
        else{
          const newSong: Song | undefined = this.responseService.getContent(songRes);
          if(newSong){
            this.song = this.songService.separate_song_body(newSong);
          }
          this.getCurrentSongPartIndex();
          this.getTopQ();
        }
      });
    }
  }

  has_next_song():boolean{
    return (this.top_queue?.length || 0) !== 0;
  }

  onLastSongPart(){
    this.is_last_song_part = true;
  }

  onSongAdd(){
    console.log('about to update song');
    console.log(this.song);
    if(!this.song){
      this.getSong();
    }
    if(this.top_queue && this.top_queue.length<2){
      this.getTopQ();
    }
  }


  //service calls
  getSong(): void{
    let songRes: Response<Song> | null = null;
    this.songService.get_song(this.room_id).subscribe(data => {songRes = {...data}

      if(songRes === null || this.responseService.isError(songRes)){
        console.log('error in getting position');
        console.log(songRes);
        this.notificationService.openSnackBarError(this.snackBar, songRes === null ? 'result is null' : this.responseService.getError(songRes))
      }
      else{
        const songResContent : Song | undefined = this.responseService.getContent(songRes);
        this.song = songResContent ? this.songService.separate_song_body(songResContent) : songResContent
        if(songResContent)
          this.getCurrentSongPartIndex();
      }
    });
  }

  getTopQ(): void{
    let queueRes: Response<Song[]> | null = null;
    this.queueService.get_top_queue(this.room_id).subscribe(data => {queueRes = {...data}
      if(queueRes === null || this.responseService.isError(queueRes)){
        console.log('error in getting top_queue in constructor');
        console.log(queueRes);
        this.notificationService.openSnackBarError(this.snackBar, queueRes === null ? 'result is null' : this.responseService.getError(queueRes))
      }
      else{
        this.top_queue = this.responseService.getContent(queueRes);
      }
    });
  }

  getCurrentSongPartIndex(): void{
    this.songService.get_position(this.room_id).subscribe(data => {
      const linesRes: Response<number> = {...data};
      if(linesRes === null || this.responseService.isError(linesRes)){
        console.log('error in getting position in getCurrentSongPartIndex');
        console.log(linesRes);
        this.current_song_part_index = 0;
        this.notificationService.openSnackBarError(this.snackBar, linesRes === null ? 'result is null' : this.responseService.getError(linesRes))
      }
      else{
        this.current_song_part_index = this.responseService.getContent(linesRes);
      }
    });
  }

}
