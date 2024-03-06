import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { EventEmitter } from '@angular/core';
import { BASE_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private socket;
  public broadcastReceived = new EventEmitter<string>();

  constructor() {
    this.socket = io(BASE_URL);
  }

  listenForBroadcasts() {
    this.socket.on('broadcast', (msg) => {
      console.log('Received broadcast from server:', msg);
      this.broadcastReceived.emit(msg);
    });
  }
}
