import { Song } from "./Song";
import { Queue,SongInfo,SongsQueue } from "./Queue"; // Assuming Queue is exported from a separate file


class Room {
    private songsQueue: SongsQueue;
    private host: any;
    private id :number;

    //this will be called upon host room
    constructor(host: any, id : number) {
    //get current avalable id and increment
    this.id = id;
    this.songsQueue = new SongsQueue();
    this.host = host;
    }

    //returns room id 
    get_room_id(){
        return this.id;
    }

    //returns if join room worked (found the room)
    join_room(): string {
        return "ok";
    }

    //gets the current position in the current song
    get_current_position(): number {
        return this.songsQueue.get_current_position_in_song();
    }

    //returns the current song on the queue
    get_current_song(): SongInfo | undefined { //returns json(song_name, song_author,song_body,status) 
        return this.songsQueue.getCurrentSong();
    }

    add_song_from_url(url : string) : Promise<SongInfo> {//returns a promise
        return this.songsQueue.addToQueueFromUrl(url);
    }

    add_song_from_name_id(id : string) : Promise<any> {//returns a promise
        return this.songsQueue.addToQueueFromUrl(id);
    }

    advance_position() : number{
        return this.songsQueue.advance_position_in_song();
    }

    previous_position() : number{
        return this.songsQueue.previous_position_in_song();
    }

    advance_song() : SongInfo | undefined{
        this.songsQueue.skipSong();
        return this.songsQueue.getCurrentSong();
    }

    get_top_queue() : SongInfo[]{
        return this.songsQueue.get_top2_songs()
    } 

    get_all_queue() : SongInfo[]{
        return this.songsQueue.get_all_queue()
    }

    
    remove_song_from_queue(song_to_remove_position : number){
        this.songsQueue.remove_song_from_queue(song_to_remove_position);
    }

    add_song_to_queue(song_name : string ,song_author : string): Promise<void>{
        return this.songsQueue.addToQueueByName(song_name,song_author)
    }

    get_queue_len(): number {
        return this.songsQueue.get_queue_len()
    }

    get_host_key() : string{
        return this.host
    }

}

export { Room };