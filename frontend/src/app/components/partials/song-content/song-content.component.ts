import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/shared/models/Song';
import { SongLine } from 'src/app/shared/models/SongLine';

@Component({
  selector: 'song-content',
  templateUrl: './song-content.component.html',
  styleUrls: ['./song-content.component.css']
})
export class SongContentComponent implements OnInit, OnChanges {
  //song?:Song;
  show_chords:boolean = false;
  is_last_part?:boolean;
  
  @Input() current_part_index?: number;
  @Input() song?: Song;
  @Output() onLastPartEvent = new EventEmitter<void>();

  constructor(activatedRoute:ActivatedRoute, songService:SongService,
          private router: Router) {
    /*activatedRoute.params.subscribe((params) => {
      if(params.song) this.song = params.song;
    });*/
    //this.song = songService.generate_test_Song();
    this.emitIfLastPart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['current_part_index'])
      this.emitIfLastPart();
  }

  ngOnInit(): void {
  }

  switchChords():void{
    this.show_chords = !this.show_chords;
    //console.log(this.show_chords);
  }


  isEmptyLine(line: SongLine) : boolean{
    return line.content == undefined || line.content == '';
  }

  

  emitIfLastPart(){
    if(this.current_part_index != undefined && this.current_part_index + 1  == this.song?.song_parted_body?.length)
      this.onLastPartEvent.emit();
  }


}
