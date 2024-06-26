import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/shared/models/Song';
import { SongLine } from 'src/app/shared/models/SongLine';

@Component({
  selector: 'song-content',
  templateUrl: './song-content.component.html',
  styleUrls: ['./song-content.component.css'],
  animations: [
    trigger('partChange', [
      state('void', style({ opacity: 0.2 })), // Initial state for entering parts
      state('active', style({ opacity: 1 })), // Active state for visible parts
      transition('void <=> active', [animate('300ms ease-in-out')]), // Transition animation
    ]),
  ]
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
    if(changes['current_part_index']){
      this.emitIfLastPart();
      this.scrollToIndex(this.current_part_index ?? 0)
    }
      
    if(changes['song']){
      //console.log('ngOnChanges in SongContentComponent', changes);
      //console.log('song changes:');
      //console.log(this.song);
    }
      
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

  scrollToIndex(index: number){
    const element = document.getElementById(`part${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}
