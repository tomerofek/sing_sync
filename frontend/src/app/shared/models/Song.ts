import { SongLine } from "./SongLine";

export class Song{
    song_name!: string;
    song_author!: string;
    song_body?: SongLine[];

    constructor(name: string, author: string, body?: SongLine[]){
        this.song_name = name;
        this.song_author = author;
        this.song_body = body;
    }
}