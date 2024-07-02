import { Song } from "./Song";
import { SongWithChecked } from "./SongWithChecked";

export class Queue{
    songs_info_list!:Song[];
    index!:number;
}

export class QueueWithChecked{
    songs_info_list!:SongWithChecked[];
    index!:number;

    constructor(q: Queue){
        this.index = q.index;
        this.songs_info_list = q.songs_info_list.map(song => new SongWithChecked(song));
    }
}