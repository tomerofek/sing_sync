import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
// import { Food } from 'src/app/shared/models/Food';
import { WebsocketService } from 'src/app/services/websocket.service'; // Import the SocketService


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    broadcastMessage: string = '';
    message: string = '';
    songResponse: any;
    constructor(
      private foodService: FoodService,
      private activatedRoute: ActivatedRoute,
      private socketService: WebsocketService
    ) {}
  
    ngOnInit(): void {
      this.socketService.listenForBroadcasts();
      this.socketService.broadcastReceived.subscribe((msg) => {
        this.broadcastMessage = msg;
      });
    }
  
    sendHello(message: string) {
        this.foodService.sendHello(message);
    }
    getSongFromUrl(roomId: string, url: string) {
      this.foodService.getSongFromUrl(roomId, url).subscribe(response => {
        this.songResponse = response;
      });
    }

    
  }
