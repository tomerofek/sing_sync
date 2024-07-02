import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { EventEmitter } from '@angular/core';
import { BASE_URL } from '../shared/constants/url';
import { Song } from '../shared/models/Song';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private socket: Socket | null; 
  public broadcastReceived = new EventEmitter<string>();
  public positionReceived = new EventEmitter<number>();
  public songReceived = new EventEmitter<Song>();
  public topOfQueueReceived = new EventEmitter<Song[]>();
  public closeRoomRecievied = new EventEmitter<void>();

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

  listenForPositions() {
    if (this.socket) {
      this.socket.on('position', (msg) => {
        console.log('Position broadcast from server:', msg);
        this.positionReceived.emit(msg);
      });
    }
  }

  listenForSongs() {
    if (this.socket) {
      this.socket.on('song', (msg) => {
        console.log('Song broadcast from server:', msg);
        this.songReceived.emit(msg);
      });
    }
  }

  listenForTopOfQueues() {
    if (this.socket) {
      this.socket.on('topOfQueue', (msg) => {
        console.log('Queue broadcast from server:', msg);
        this.topOfQueueReceived.emit(msg);
      });
    }
  }

  listenForCloseRoom() {
    if (this.socket) {
      this.socket.on('closeRoom', (msg) => {
        console.log('close room broadcast from server:', msg);
        this.closeRoomRecievied.emit();
      });
    }
  }

}
