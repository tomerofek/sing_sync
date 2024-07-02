import { Song } from "./Song";

export class SongWithChecked extends Song{
    checked!:boolean;

    constructor(song: Song){
        super(song.song_name, song.song_author, song.song_body);
        this.checked = false;
    }
}
