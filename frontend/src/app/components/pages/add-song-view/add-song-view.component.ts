import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-song-view',
  templateUrl: './add-song-view.component.html',
  styleUrls: ['./add-song-view.component.css']
})
export class AddSongViewComponent implements OnInit {

  room_id!: string;
  added_song_flag: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddSongViewComponent>,
              @Inject(MAT_DIALOG_DATA) room_id: any) {
    this.room_id = room_id;
  }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.closeDialog();
    });
  }

  onSongAdd(): void {
    this.added_song_flag = true;
  }

  closeDialog(){
    this.dialogRef.close(this.added_song_flag);
  }

}
