import { Song } from "./Song";
import { Queue,SongsQueue } from "./Queue"; // Assuming Queue is exported from a separate file

class Room {
    private songsQueue: SongsQueue;
    private members: any[]; // Assuming your HTTP clients are stored as an array of objects
    private current_position_in_song : number
    
    //this will be called upon host room
    constructor(host: any) {
        this.songsQueue = new SongsQueue();
        this.members = [];
        this.current_position_in_song = 0;
        this.joinRoom(host);
    }

    //returns current position in room
    joinRoom(member: any): number {
        this.members.push(member);
        return this.current_position_in_song;
    }

    removeMember(member: any): void {
        const index = this.members.indexOf(member);
        if (index !== -1) {
            this.members.splice(index, 1);
        }
    }

    add_song_from_url(url : string) : any {//returns a promise
        return this.songsQueue.addToQueueFromUrl(url);
    }

    get_song(): any { //returns json(song_name, song_author,song_body,status) 
        return this.songsQueue.getCurrentSong();
    }
}

export { Room };