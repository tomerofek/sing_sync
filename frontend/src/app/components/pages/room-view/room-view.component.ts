import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { CookieService } from 'src/app/services/cookie.service';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit, OnChanges {

  current_song_part_index?: number;
  is_last_song_part?: boolean;
  room_id!: string;
  owner_perm!: boolean;
  song?: Song;
  top_queue?: Song[];
  has_next_song!: boolean;
  has_prev_song!: boolean

  constructor(activatedRoute:ActivatedRoute, private roomService:RoomService, private responseService:ResponseService,
    private songService:SongService, private queueService:QueueService, private router: Router,
    private notificationService: NotificationService, private snackBar: MatSnackBar, private socketService: WebsocketService,
    private CookieService: CookieService, private clipboard: Clipboard) {
      activatedRoute.params.subscribe((params) => {
        if(params.roomid) this.room_id = params.roomid;
      });
    let res: Response<boolean> | null = null;
    var owner_key = this.CookieService.getCookie(this.room_id);
    var encodedStr = this.CookieService.encode_with_base64_room_and_host(this.room_id,owner_key);
    roomService.join_room(encodedStr).subscribe(data => {res = {...data}
      if(res === null || responseService.isError(res)){
        console.log('error in getting song in constructor:',res);
        this.notificationService.openSnackBarError(this.snackBar,responseService.getError(res));
        this.router.navigateByUrl('');
      }
      var perm:boolean|undefined = responseService.getContent(res);
      this.owner_perm = perm !== undefined ? perm : false;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.getSong();
    this.getTopQ();
    this.update_has_next_song()
    this.update_has_prev_song()

    //subscribe for broadcasts
    this.socketService.io_connect(this.room_id);
    this.socketService.listenForPositions();
      this.socketService.positionReceived.subscribe((num) => {
        this.current_song_part_index = num;
    });

    this.socketService.listenForSongs();
      this.socketService.songReceived.subscribe((song) => {
        if(song !== undefined && song !== null){
          this.song = this.songService.separate_song_body(song)
        }
    });

    this.socketService.listenForTopOfQueues();
      this.socketService.topOfQueueReceived.subscribe((songs) => {
        this.top_queue = songs;
    });

    this.socketService.listenForCloseRoom();
      this.socketService.closeRoomRecievied.subscribe(() => {
        if(!this.owner_perm)
          this.notificationService.openSnackBar(this.snackBar, 'החדר נסגר על ידי מנהל החדר');
        this.router.navigateByUrl('');
      });
  }

  home() {
    // TODO: call to broadcasts unsbscribe
    this.router.navigateByUrl('/');
  }

  share() {
    const textToCopy = window.location.href;
    this.clipboard.copy(textToCopy);
    this.notificationService.openSnackBar(this.snackBar, 'קישור הזמנה הועתק')
  }

  close_room(){
    this.notificationService.openSnackBarWithAction(this.snackBar, 'יש לאשר את סגירת החדר', 'לחץ כדי לאשר', 
      () => {
        let res: Response<void> | null = null;
        this.roomService.close_room(this.room_id).subscribe(data => {res = {...data}
          if(res === null || this.responseService.isError(res)){
            console.log('error in close room:', res);
            this.notificationService.openSnackBarError(this.snackBar, res === null ? 'היתה בעיה בלסגור את החדר' : this.responseService.getError(res));
          }
          else{
            this.notificationService.openSnackBar(this.snackBar, 'החדר נסגר בהצלחה' );
          }
        });
      }
    )
  }

  sendHello(message: string) {
    this.songService.sendHello(message, this.room_id);
  }

  next_lines():void{
    let linesRes: Response<number> | null = null;
    this.songService.advance_position(this.room_id).subscribe(data => {linesRes = {...data}
      if(linesRes === null || this.responseService.isError(linesRes)){
        console.log('error in advance position:', linesRes);
        this.notificationService.openSnackBarError(this.snackBar, linesRes === null ? 'היתה בעיה בלעבור לחלק הבא' : this.responseService.getError(linesRes))
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
        console.log('error in prev position:', linesRes);
        this.notificationService.openSnackBarError(this.snackBar, linesRes === null ? 'היתה בעיה בלעבור לחלק הקודם' : this.responseService.getError(linesRes))
      }
      else{
        this.current_song_part_index = this.responseService.getContent(linesRes);
      }

    });
    this.is_last_song_part = false;
  }

  next_song():void{
    let songRes: Response<Song> | null = null;
    this.songService.advance_song(this.room_id).subscribe(data => {songRes = {...data}
      if(songRes === null || this.responseService.isError(songRes)){
        console.log('error in next song', songRes);
        this.notificationService.openSnackBarError(this.snackBar, songRes === null ? 'היתה בעיה בלהעביר שיר' : this.responseService.getError(songRes))
      }
      else{
        //the song will be updated in the broadcast
        this.is_last_song_part = false;
        this.getCurrentSongPartIndex();
        this.getTopQ();
        this.update_has_next_song();
        this.update_has_prev_song();
      }
    });
  }

  onLastSongPart(){
    this.is_last_song_part = true;
  }

  onSongAdd(){
    if(!this.song){
      this.getSong();
    }
    if(this.top_queue && this.top_queue.length<2){
      this.getTopQ();
    }
    this.update_has_next_song();
  }


  //service calls
  getSong(): void{
    let songRes: Response<Song> | null = null;
    this.songService.get_song(this.room_id).subscribe(data => {songRes = {...data}

      if(songRes === null || this.responseService.isError(songRes)){
        console.log('error in getting position', songRes);
        this.notificationService.openSnackBarError(this.snackBar, songRes === null ? 'result is null' : this.responseService.getError(songRes))
      }
      else{
        const songResContent : Song | undefined = this.responseService.getContent(songRes);
        this.song = songResContent ? this.songService.separate_song_body(songResContent) : songResContent
        if(songResContent)
          console.log(this.songService.separate_song_body(songResContent))
        if(songResContent)
          this.getCurrentSongPartIndex();
      }
    });
  }

  getTopQ(): void{
    let queueRes: Response<Song[]> | null = null;
    this.queueService.get_top_queue(this.room_id).subscribe(data => {queueRes = {...data}
      if(queueRes === null || this.responseService.isError(queueRes)){
        console.log('error in top_queue:', queueRes);
        this.notificationService.openSnackBarError(this.snackBar, queueRes === null ? 'בעיה בהצגת רשימת השירים' : this.responseService.getError(queueRes))
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
        console.log('error in getting position:', linesRes);
        this.current_song_part_index = 0;
        this.notificationService.openSnackBarError(this.snackBar, linesRes === null ? 'היתה בעיה בלהשיג את המיקום בשיר' : this.responseService.getError(linesRes))
      }
      else{
        this.current_song_part_index = this.responseService.getContent(linesRes);
      }
    });
  }

  prev_song() {
    let songRes: Response<Song> | null = null;
    this.queueService.previous_song(this.room_id).subscribe(data => {songRes = {...data}
      if(songRes === null || this.responseService.isError(songRes)){
        console.log('error in prev song:', songRes);
        this.notificationService.openSnackBarError(this.snackBar, songRes === null ? 'היתה בעיה בחזור לשיר הקודם' : this.responseService.getError(songRes))
      }
      else{
        //the song will be updated in the broadcast
        this.is_last_song_part = false;
        this.getCurrentSongPartIndex();
        this.getTopQ();
        this.update_has_next_song();
        this.update_has_prev_song();
      }
    });
  }

  update_has_next_song() {
    let res: Response<boolean> | null = null;
    this.queueService.has_next_song(this.room_id).subscribe(data => {res = {...data}
      if(res === null || this.responseService.isError(res)){
        console.log('error in updating has next song:', res);
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'היתה בעיה בלעדכן את כפתורי המעברים' : this.responseService.getError(res))
      }
      else{
        this.has_next_song = this.responseService.getContent(res) ?? false;
      }
    });
  }

  update_has_prev_song() {
    let res: Response<boolean> | null = null;
    this.queueService.has_previous_song(this.room_id).subscribe(data => {res = {...data}
      if(res === null || this.responseService.isError(res)){
        console.log('error in updating has previous song:', res);
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'היתה בעיה בלעדכן את כפתורי המעברים' : this.responseService.getError(res))
      }
      else{
        this.has_prev_song = this.responseService.getContent(res) ?? false;
      }
    });
  }

  updateHasNextPrev() {
    this.update_has_next_song();
    this.update_has_prev_song();
  }

}
