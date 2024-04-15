import { Room } from "./Room";
import { getSongNames} from "./Queue"
export class RoomController {
    sharedBuffer : SharedArrayBuffer;// 4 bytes for a 32-bit integer
    next_id : Int32Array;
    rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map();
        this.sharedBuffer = new SharedArrayBuffer(4); // 4 bytes for a 32-bit integer
        this.next_id = new Int32Array(this.sharedBuffer);
        // Set initial value
        this.next_id[0] = 0;
    }

    //creates a new room returns the new id of the room
    hostRoom(host: any) : string {
        const id = Atomics.add(this.next_id, 0, 1) //adds 1 to the existing value. returns the prev value
        let r : Room = new Room(host, id);
        this.rooms.set(r.get_room_id().toString(),r);
        return r.get_room_id().toString();
    }

    //joins the room returns ok if the room was found and not null
    joinRoom(room_id: string): string {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.join_room() ?? "Invalid ID";

        }
        throw new Error("Invalid ID");
    }

    //returns the current position in the song
    get_current_position(room_id: string): number | undefined {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.get_current_position();
        }
        throw new Error("Invalid ID");
    }

    //returns the current song if undifined - error
    get_current_song(room_id: string): any {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.get_current_song();
        }
        throw new Error("Invalid ID");

    }

    //advance a position in the currently played song - returns -1 upon error
    advance_position(room_id: string): number | undefined{
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.advance_position();
        }
        throw new Error("Invalid ID");
    }

    //goes to the previous position in the currently played song and returns the current one - return -1 on error
    previous_position(room_id : string) : number | undefined {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.previous_position();
        }
        throw new Error("Invalid ID");
    }

    //advances to the next song and returns the new song the needs to be played
    advance_song(room_id : string): any{
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.advance_song();
        }
        throw new Error("Invalid ID");
    }

    //returns a json with the name and author of the first 2 songs in the queue
    get_top_queue(room_id : string) : any{
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.get_top_queue();
        }
        throw new Error("Invalid ID");
    }

    //returns a json with the name and author of all of the queue
    get_all_queue(room_id : string) : any{
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.get_all_queue()
        }
        throw new Error("Invalid ID");
    }

    //removes the item at index from the queue (remove current song is index 0)
    remove_song_from_queue(room_id : string,song_to_remove_position : number) : void{
        if (this.rooms.has(room_id)){      
            this.rooms.get(room_id)?.remove_song_from_queue(song_to_remove_position)
        }
        throw new Error("Invalid ID");
    }

    //searches a song in the db returns the names and authors - as a list of json (each json is a tuple)
    search_song_from_db(song_name:string, song_author:string): Promise<any>{
        return getSongNames(song_name ,song_author);
    }

    //adds a song to the queue using the id - concatanation of name and author and returns the added song
    add_song_to_queue(room_id : string ,song_name : string ,song_author : string): Promise<void>{
        //checks if the the room exists if yes add the song
        let room = this.rooms.get(room_id);
        if (!room) {
            throw new Error("Room doesn't exist");
        }
        //attempt to add the song to the room's queue
        let ret = room.add_song_to_queue(song_name, song_author);
        if(ret){
            return ret
        }
        throw new Error("cannot add song to queue");
    }

        //adds a song to the queue using the url - concatanation of name and author and returns the added song
        //this function throw massages but on web scraping or db uploading the error will be in the promise returned value
        get_song_from_url(room_id : string ,url : string): Promise<void>{
            //checks if the the room exists if yes add the song
            let room = this.rooms.get(room_id);
            if (!room) {
                throw new Error("Room doesn't exist");
            }
            //attempt to add the song to the room's queue with the given url
            let ret = room.add_song_from_url(url);
            if(ret){
                return ret
            }
            throw new Error("cannot add song to queue from this url");
        }


}

// Example usage