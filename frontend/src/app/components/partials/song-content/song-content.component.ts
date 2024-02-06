import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/shared/models/Song';

@Component({
  selector: 'song-content',
  templateUrl: './song-content.component.html',
  styleUrls: ['./song-content.component.css']
})
export class SongContentComponent implements OnInit {
  song:Song;
  show_chords:boolean = false;

  constructor(activatedRoute:ActivatedRoute, songService:SongService,
          private router: Router) {
    /*activatedRoute.params.subscribe((params) => {
      if(params.song) this.song = params.song;
    });*/
    this.song = songService.generate_test_Song();
  }

  ngOnInit(): void {
  }

  switchChords():void{
    this.show_chords = !this.show_chords;
    //console.log(this.show_chords);
  }

}
