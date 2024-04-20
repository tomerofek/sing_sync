import { SongLine } from "./SongLine";

export class Song{
    song_name!: string;
    song_author!: string;
    song_body?: SongLine[];
    song_parted_body?: SongLine[][];
    

    constructor(name: string, author: string, body?: SongLine[]){
        this.song_name = name;
        this.song_author = author;
        this.song_body = body;
        this.song_parted_body = [];
        /*
        if(body){
            this.separate_body();
        }
        */
    }

    /*
    separate_body(){
        if(this.song_parted_body || !this.song_body)
            return;

        var max_visible_lines = 12;
        var min_visible_lines = 6;
        this.song_parted_body = [];

        var current_part : SongLine[] = [];
        var last_line : SongLine;
        this.song_body.forEach(line => {
            if(current_part.length == 0 && this.isEmptyLine(line))
                return;

            if(current_part.length < min_visible_lines || last_line.type == 'chords' ||
                (!this.isEmptyLine(line) && current_part.length < max_visible_lines))
                    current_part.push(line);
                    
            else{
                this.song_parted_body?.push(current_part);
                current_part = this.isEmptyLine(line) ? [] : [line];
            }

            if(!this.isEmptyLine(line))
                last_line = line;
        });

        if(current_part.length > 0)
            this.song_parted_body?.push(current_part);
    }

    private isEmptyLine(line: SongLine) : boolean{
        return line.content == undefined || line.content == '';
    }
    */
}

