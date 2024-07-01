import { Room } from "./Room";
import { SongInfo, getSongNames} from "./Queue"

const key_length = 16; // Length of the random string (adjust as needed)


// Encode function using Base64 encoding
function encode_with_base64_room_and_host(str1: string, str2: string): string {
    const delimiter = "|"; // Choose a delimiter that won't occur in your strings
    let text = `${str1}${delimiter}${str2}`;
    return Buffer.from(text).toString('base64');
}

// Decode function using Base64 decoding
function decodeWithBase64(encodedText: string): string {
    return Buffer.from(encodedText, 'base64').toString('utf8');
}

function generateRandomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < key_length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}


export class ServiceQueue {
    private songs_info_list : SongInfo[] | undefined
    private index : number

    constructor(song_info_list : SongInfo[], index : number){
        this.songs_info_list = song_info_list
        this.index = index
    }

}

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
        const host_key : string = generateRandomString()
        let r : Room = new Room(host_key, id);
        this.rooms.set(r.get_room_id().toString(),r);
        return encode_with_base64_room_and_host(id.toString(),host_key);
    }

    //joins the room returns ok if the room was found and not null
    joinRoom(room_id: string): boolean {
        const param = decodeWithBase64(room_id)
        //check if contains | - if so its host join
        if(param.includes("|")){
            const parts: string[] = param.split("|");
            //check room id exists
            if (this.rooms.has(parts[0])){
                //check if key is correct
                if(this.rooms.get(parts[0])?.get_host_key() === parts[1]){
                    //function in the line below only returns ok and doesnt do anything for now
                    this.rooms.get(room_id)?.join_room();
                    return true;

                }
                //case that none host tries to join
                throw new Error("מפתח מנהל חדר לא תקין");
            }
            throw new Error("מספר חדר לא תקין");
        
        }else{
            console.log("attempt normal login")
            if (this.rooms.has(param)){
                console.log("room exists trying to enter")
                //function in the line below only returns ok and doesnt do anything for now
                this.rooms.get(param)?.join_room();
                return false;

            }
            console.log("no such room");
            throw new Error("מספר חדר לא תקין");
        }
    }

    //returns the current position in the song
    get_current_position(room_id: string): number | undefined {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.get_current_position();
        }
        throw new Error("מספר חדר לא תקין");
    }

    //returns the current song if undifined - error
    get_current_song(room_id: string): SongInfo | undefined {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.get_current_song();
        }
        throw new Error("מספר חדר לא תקין");

    }

    //advance a position in the currently played song - returns -1 upon error
    advance_position(room_id: string): number | undefined{
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.advance_position();
        }
        throw new Error("מספר חדר לא תקין");
    }

    //goes to the previous position in the currently played song and returns the current one - return -1 on error
    previous_position(room_id : string) : number | undefined {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.previous_position();
        }
        throw new Error("מספר חדר לא תקין");
    }

    //advances to the next song and returns the new song the needs to be played
    advance_song(room_id : string): SongInfo | undefined{
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.advance_song();
        }
        throw new Error("מספר חדר לא תקין");
    }

    //returns a json with the name and author of the first 2 songs in the queue
    get_top_queue(room_id : string) : SongInfo[] | undefined{
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.get_top_queue();
        }
        throw new Error("מספר חדר לא תקין");
    }

    //returns a json with the name and author of all of the queue
    get_all_queue(room_id : string) : ServiceQueue | undefined{
        if (this.rooms.has(room_id)){    
            const songs_info_list : SongInfo[] | undefined = this.rooms.get(room_id)?.get_all_queue();
            const index : number | undefined = this.rooms.get(room_id)?.get_index();
            //if songs_info_list or index is undefined return undefined
            if(songs_info_list === undefined || index === undefined){
                return undefined;
            }
            return new ServiceQueue(songs_info_list,index);
        }
        throw new Error("מספר חדר לא תקין");
    }

    //removes the item at index from the queue (remove current song is index 0)
    remove_song_from_queue(room_id : string,song_to_remove_position : number[]) : number{
        if (this.rooms.has(room_id)){      
            let new_current_index =  this.rooms.get(room_id)?.remove_song_from_queue(song_to_remove_position)
            if(new_current_index === undefined){
                throw new Error("מספר חדר לא תקין");
            }
            return new_current_index;
        }
        throw new Error("מספר חדר לא תקין");
    }

    //searches a song in the db returns the names and authors - as a list of json (each json is a tuple)
    search_song_from_db(song_id:string): Promise<any>{
        return getSongNames(song_id);
    }

    //adds a song to the queue using the id - concatanation of name and author and returns the added song
    add_song_to_queue(room_id : string ,song_name : string ,song_author : string): Promise<void>{
        //checks if the the room exists if yes add the song
        let room = this.rooms.get(room_id);
        if (!room) {
            throw new Error("החדר אינו קיים");
        }
        //attempt to add the song to the room's queue
        let ret = room.add_song_to_queue(song_name, song_author);
        if(ret){
            return ret
        }
        throw new Error("לא ניתן להוסיף את השיר אל החדר");
    }

    //adds a song to the queue using the url - concatanation of name and author and returns the added song
    //this function throw massages but on web scraping or db uploading the error will be in the promise returned value
    get_song_from_url(room_id : string ,url : string): Promise<SongInfo>{
        //checks if the the room exists if yes add the song
        let room = this.rooms.get(room_id);
        if (!room) {
            throw new Error("חדר אינו קיים");
        }
        //attempt to add the song to the room's queue with the given url
        let ret = room.add_song_from_url(url);
        if(ret){
            return ret
        }
        throw new Error("לא ניתן להוסיף שיר מן הקישור הזה");
    }

    
    get_queue_len(room_id: string): number {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.get_queue_len() ?? 0
        }
        throw new Error("מספר חדר לא תקין");
    }

    previous_song(room_id: string): SongInfo | undefined{
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.previous_song();
        }
        throw new Error("מספר חדר לא תקין");
    }

    swap_song(room_id: string, index1: number, index2: number): number | undefined {
        if (this.rooms.has(room_id)){      
            return this.rooms.get(room_id)?.swap_songs(index1, index2);;
        }
        throw new Error("מספר חדר לא תקין");
    }

    has_next(room_id : string) : boolean {
        if (this.rooms.has(room_id)){   
            let room_has_next = this.rooms.get(room_id)?.has_next();   
            if(undefined !== room_has_next){
                return room_has_next;
            }
        }
        throw new Error("מספר חדר לא תקין");
        
    }
  
    has_prev(room_id : string) : boolean {
        if (this.rooms.has(room_id)){   
            let room_has_prev = this.rooms.get(room_id)?.has_prev();   
            if(undefined !== room_has_prev){
                return room_has_prev;
            }
        }
        throw new Error("מספר חדר לא תקין");
        
    }

    close_room(room_id : string) : void {
        if (this.rooms.has(room_id)){   
            this.rooms.delete(room_id);
        }
        else throw new Error("מספר חדר לא תקין");
    }

}

// Example usage