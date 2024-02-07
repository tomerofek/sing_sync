import { SongLine } from "./SongLine";

export class Song{
    song_name!: string;
    song_author!: string;
    song_body?: SongLine[];

    constructor(n:string, a:string, b: SongLine[]){
        this.song_name=n;
        this.song_author=a;
        this.song_body=b;
    }
}