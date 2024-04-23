import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { EventEmitter } from '@angular/core';
import { BASE_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private socket: Socket | null; 
  public broadcastReceived = new EventEmitter<string>();

  constructor() {
    this.socket = null;
  }

  io_connect(room_id: string) {
    this.socket = io(`${BASE_URL}?room_id=${room_id}`);
  }

  listenForBroadcasts() {
    if (this.socket) {
      this.socket.on('broadcast', (msg) => {
        console.log('Received broadcast from server:', msg);
        this.broadcastReceived.emit(msg);
      });
    }
  }
}
