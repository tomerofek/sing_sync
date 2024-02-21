import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/shared/models/Song';

@Component({
  selector: 'add-song-normal-search',
  templateUrl: './add-song-normal-search.component.html',
  styleUrls: ['./add-song-normal-search.component.css']
})
export class AddSongNormalSearchComponent implements OnInit {

  results: Song[] = [];
  name_input: string = '';
  author_input: string = '';
  search_type: string = 'name';

  constructor() {
    
   }

  ngOnInit(): void {
  }

  searchSongs() {
    window.alert(`searched for: ${this.name_input} - ${this.author_input}`);
    this.name_input = ''; this.author_input = '';
    this.results = this.generateResults();
  }

  addSongToQ(song: Song){
    window.alert(`adding song:\n ${song.song_name} \n ${song.song_author}`);
  }

  updateSearchBar(option: string){
    this.search_type = option;
    switch(option){
      case('name'):
        this.author_input = '';
        break;
      case('author'):
        this.name_input = '';
        break;
    }
  }




  //todo: change this to a service function call
  private generateResults(){
    return [
      new Song('יסמין','הפיל הכחול'),
      new Song('איש של לילה', 'רוני דלומי')
    ];
  }

}
