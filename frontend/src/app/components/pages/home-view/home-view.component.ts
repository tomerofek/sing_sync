import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ResponseService } from 'src/app/services/response.service';
import { RoomService } from 'src/app/services/room.service';
import { Response } from 'src/app/shared/models/Response';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('hidden', style({
        opacity: 0,
        height: '0px',
        overflow: 'hidden'
      })),
      state('visible', style({
        opacity: 1,
        height: '*'
      })),
      transition('hidden => visible', [
        animate('0.5s ease-in')
      ]),
      transition('visible => hidden',[
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class HomeViewComponent implements OnInit {

  showJoin:boolean = false;

  constructor(activatedRoute:ActivatedRoute, private router:Router, private roomService: RoomService, private responseService: ResponseService,
    private notificationService: NotificationService, private snackBar: MatSnackBar, private cookieService: CookieService
  ) {
   }

  ngOnInit(): void {
  }

  toggleJoin() {
    this.showJoin = !this.showJoin;
  }

  goToRoom(room_id: string): void {
    //console.log(room_id)
    if(room_id){
      this.router.navigateByUrl('/room/' + room_id);
    }
  }

  hostRoom(): void {
    var res: Response<string> | null = null;
    this.roomService.host_room().subscribe(data => {res = {...data}
      // TODO: show an error message
      if(res === null || this.responseService.isError(res)){
        console.log(res)
        this.notificationService.openSnackBarError(this.snackBar, res === null ? 'result is null' : this.responseService.getError(res))
        window.alert(res === null ? "response is null" : this.responseService.getContent(res));
      }
      else{
        var content = this.cookieService.decodeWithBase64(<string>this.responseService.getContent(res));
        console.log(content);
        const { var1, var2 } = this.cookieService.splitString(content);
        console.log(var1, var2);
        this.cookieService.setCookie(var1,var2,7);
        this.router.navigateByUrl('/room/' + var1);
      }
    });
  }

  goToStats(): void{
    
  }

}
