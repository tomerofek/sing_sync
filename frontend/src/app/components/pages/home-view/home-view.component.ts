import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';
import { RoomService } from 'src/app/services/room.service';
import { Response } from 'src/app/shared/models/Response';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  constructor(activatedRoute:ActivatedRoute, private router:Router, private roomService: RoomService, private responseService: ResponseService) {
   }

  ngOnInit(): void {
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
        window.alert(res === null ? "response is null" : this.responseService.getContent(res));
      }
      else{
        this.router.navigateByUrl('/room/' + this.responseService.getContent(res));
      }
    });
  }

  goToStats(): void{
    
  }

}
