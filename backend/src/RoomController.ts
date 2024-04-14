import { Room } from "./Room";

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
        return "Invalid ID";
    }

    //returns the current position in the song
    get_current_position(room_id: string): number {
        return this.rooms.get(room_id)?.get_current_position() ?? -1;
    }

    //returns the current song
    get_current_song(room_id: string): any {
        return this.rooms.get(room_id)?.get_current_song() ?? "room not found";
    }

    //advance a position in the currently played song - returns -1 upon error
    advance_position(room_id: string): number {
        return this.rooms.get(room_id)?.advance_position() ?? -1;
    }

    //goes to the previous position in the currently played song and returns the current one - return -1 on error
    previous_position(room_id : string) : number {
        return this.rooms.get(room_id)?.previous_position() ?? -1;
    }

    //advances to the next song and returns the new song the needs to be played
    advance_song(room_id : string): any{
        return this.rooms.get(room_id)?.advance_song() ?? -1;
    }

    //returns a json with the name and author of the first 2 songs in the queue
    get_top_queue(room_id : string) : any{
        return this.rooms.get(room_id)?.get_top_queue(room_id) ?? -1;
    } 

}

// Example usage