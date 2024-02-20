import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/shared/models/Song';

@Component({
  selector: 'add-song-normal-search',
  templateUrl: './add-song-normal-search.component.html',
  styleUrls: ['./add-song-normal-search.component.css']
})
export class AddSongNormalSearchComponent implements OnInit {

  results: Song[] = [];

  constructor() {
    
   }

  ngOnInit(): void {
  }

  searchSongs(searchTerm: string) {
    window.alert('searched for: ' + searchTerm);
    this.results = this.generateResults();
  }

  addSongToQ(song: Song){
    window.alert(`adding song:\n ${song.song_name} \n ${song.song_author}`);
  }




  //todo: change this to a service function call
  private generateResults(){
    return [
      new Song('יסמין','הפיל הכחול'),
      new Song('איש של לילה', 'רוני דלומי')
    ];
  }

}
