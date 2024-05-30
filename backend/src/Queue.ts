import { Song, add_song_to_db } from "./Song";
import { MongoClient, Db , ObjectId} from 'mongodb';
import {spawnSync } from "child_process";

//TODO test to queue by song name and author and fix the queue to work thread safe - also lock on the add to queue functionalities
//a simple queue implementation
const uri = "mongodb+srv://final-project:dbpassword@noder.2cvtm9i.mongodb.net/";

export async function getSongNames(song_id : string): Promise<any> {
    return new Promise(async (resolve, reject) => {


      const client = new MongoClient(uri);
      
      try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database: Db = client.db("SingSync");
        const collection = database.collection("songs");
        //easy to see that this is trivial to add to our code
        const escapedSong_id = song_id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        //the query i sent to mongo db (trivial)
        
        const array_of_songs = await collection.find({
          $or: [
            { song_name: { $regex: escapedSong_id, $options: 'i' } }, // Case-insensitive search for song_name
            { song_author: { $regex: escapedSong_id, $options: 'i' } } // Case-insensitive search for song_author
          ]
        }).toArray(); // Convert cursor to array
        if (array_of_songs) {
          const song_id_pairs = array_of_songs.map(song => {
            return {song_name : song.song_name, song_author : song.song_author};
        });
          resolve(song_id_pairs);
        } else {
          
          const error = new Error('JSON object not found.');
          reject(error);
        }
      } catch (error) {
        reject(error);
      } finally {
        // Close the connection when done
        await client.close();
        console.log('MongoDB connection closed');
      }
    });
  }
  //song info interface. lior was here
  export interface SongInfo {
    song_name: string; // changed from songName
    song_author: string; // changed from songAuthor
    song_body?: any //list of song lines: each song line has type and content
  }

  //replace this class with thread safe one
export class Queue<T> {
    private items: T[];
    private index : number;

    constructor() {
        this.items = [];
        this.index = 0;
    }

    enqueue(item: T): void {
        this.items.push(item);
    }

    move_to_next(): T | undefined {
        this.index = this.index + 1;
        return this.items[this.index - 1];
    }

    move_to_prev(): T | undefined {
      if(this.index == 0){
        throw new Error("there is no previous song");
      }
      this.index = this.index - 1;
      //when we get prev we dont want to get current song we want to get prev song , so we use the reduced index unlike before
      return this.items[this.index];
  }


    isEmpty(): boolean {
        return this.items.length - this.index === 0;
    }

    peek(): T | undefined {
        return this.items.length - this.index > 0 ? this.items[this.index] : undefined;
    }

    peek2and3Element(): T[] | undefined {
      let top2Song : any[] = []
      if(this.size() >= 3){
        top2Song.push(this.items[this.index + 1])
        top2Song.push(this.items[this.index + 2])
      }else if(this.size() == 2){
        top2Song.push(this.items[this.index + 1])
      }
      return top2Song
    }

    getQueue(): T[] {
      return this.items;
    }

    size(): number {
        return this.items.length - this.index;
    }

    remove(indexes_to_remove : number[]): number {
      indexes_to_remove = indexes_to_remove.sort()
      for(let i = 0; i < indexes_to_remove.length; i++){
        //check for invalid indexes
        if(indexes_to_remove[i] < 0 || indexes_to_remove[i] >= this.items.length){
          throw new Error("Invalid song position");
        }
        //update current index in queue
        if(indexes_to_remove[i] < this.index){
          this.index--;
        }
        //remove the song from the queue
        this.items.splice(indexes_to_remove[i],1);
        for(let i = 0; i < indexes_to_remove.length; i++){
          indexes_to_remove[i]--;
        }
      }
      return this.index
    }

    getIndex(): number {
      return this.index;
    }

    //moves the item at first index to be located in second_index (second_index of the old list)
    swap_elements(first_index : number, second_index : number) : number {
      if(first_index < 0 || second_index < 0 || first_index >= this.items.length || second_index >= this.items.length){
        throw new Error("Invalid song position");
      }
      const songToMove = this.items[first_index];

      // Remove the song from the old position
      this.items.splice(first_index, 1);
      // Insert the song at the new position
      this.items.splice(second_index, 0, songToMove);

    //moving a song that is after the one playing before the one playing
  if(first_index > this.index && second_index <= this.index){
    this.index++;
    }
    
    //moving a song that is before the one playing after the one playing
    else if(first_index < this.index && second_index >= this.index){
      this.index--;
    }
    
    //moving the song that is currently playing
    else if(first_index == this.index){
      this.index = second_index
    }
    return this.getIndex();
  }

  has_next() : boolean {
    return this.items.length  > this.getIndex() + 1;
    
  }

  has_prev() : boolean {
    return 0 < this.getIndex();
  }
}

//the queue of songs uses the Queue implementation
export class SongsQueue{
    private songsQueue: Queue<Song>;
    private current_position_in_song : number

    constructor() {
        this.songsQueue = new Queue(); // Initialize the songsQueue
        this.current_position_in_song = 0;
    }


    get_current_position_in_song() : number {
      return this.current_position_in_song;
    }
    
    //for user search function - return the list of results to user
    search_song(song_id : string) : any {
        return getSongNames(song_id).then((result) => {
            //TODO add here calledback to calling function - probably send to user side - probably send to user side
            return result;
        }).catch(error => {
            throw new Error('An error occurred while processing the data');
    });
    }

    
    //add song using url to the db and insert to queue
    async addToQueueFromUrl(url : string) : Promise<SongInfo> {
      return new Promise(async (resolve, reject) => {
        try {
            // Make an empty song
            const song = new Song("", "");

            // Update song with the data from the URL
            await this.scrapeSong(url, song);

            // The song in the queue might not be complete
            this.addToQueue(song);

            // Add the song to the database
            await add_song_to_db(song);

            // Resolve with song information
            resolve(song.getSongInfo());
        } catch (error : any) {
            // If an error occurs, reject the Promise with the error
            reject(error);
        }
      });

    }

    //TODO change scraper to nodejs and make async upload to db 
    //adds a song to the database - the mongoDB from a given url
    scrapeSong(url : string, song : Song) : Promise<void> {
      //using the python script we made for uploading the url to the databsae using shell activation
      return song.scrape_song(url)

    }


      //add song to the queue
      addToQueue(song : Song) : void{
        this.songsQueue.enqueue(song);
      }

    //skip song and returns the next song in the queue or undefined in case of empty queue
    skipSong() : Song | undefined{
      //reset the current position in the song
      this.current_position_in_song = 0;
      //dequeue the current song
      this.songsQueue.move_to_next();
      //return the next song in the queue
      return this.songsQueue.peek();
      //TODO broadcast notification to the other users using express
    }

    advance_position_in_song() : number {
      //returns the index which is the next part in the song (might want to change to status)
      return ++this.current_position_in_song;
    }

    //throw error if position <= 0
    previous_position_in_song() : number {
      //returns the index which is the previous part in the song (might want to change to status)
      if(this.current_position_in_song <= 0)
        throw new Error("there is no previous position");
      
      return --this.current_position_in_song;
    }

    //returns the current song
    getCurrentSong() : SongInfo | undefined{
      if(this.songsQueue.isEmpty()){
        return undefined;
      }
      return this.songsQueue.peek()?.getSongInfoWithBody();
      //TODO broadcast notification to the other users using express 
      //lior was here, i don't know why there is a need to broadcast here
    }

    //returns the next song in the queue
    addToQueueByName(song_name : string, song_author : string) : Promise<void>{
      const song = new Song(song_name,song_author)
      //gets the promise to know when the action is over
      const returnval = song.init_data();
      //adds the song to the queue
      this.addToQueue(song);
      return returnval;
    }

    //removes song at position from the queue
    remove_song_from_queue(song_to_remove_position : number[]) : number {
      try {
        // Attempt to remove the song from the queue
        return this.songsQueue.remove(song_to_remove_position);
      } catch (error) {
          // If an error occurs during removal, throw a new error
          throw new Error("Invalid position");
      }
    }

    //returns the first 2 elements in the song queue
    get_top2_songs() : SongInfo[]{
      //array with 2 or less songs
      let top2 = this.songsQueue.peek2and3Element()
      if(top2?.length == 2){
        let first_song: Song = top2[0] as Song;
        let second_song: Song = top2[1] as Song;
        return [first_song.getSongInfo(), second_song.getSongInfo()]
      }else if(top2?.length == 1){
        let first_song: Song = top2[0] as Song;
        return [first_song.getSongInfo()]
      }else{
        return []
      }
    }

    //returns a list with all songs names and authors
    get_all_queue() : SongInfo[]{
      let names_author_list = []
      let queue = this.songsQueue.getQueue();
      for(let i = 0; i < queue.length ; i++){
        let current_song: Song = queue[i] as Song;
        names_author_list.push(current_song.getSongInfo())
      }
      return names_author_list;
    }

    get_queue_len(): number{
      return this.songsQueue.size()
    } 

    get_index(): number{
      return this.songsQueue.getIndex()
    }

    previous_song() : SongInfo | undefined{
      //reset the current position in the song
      this.current_position_in_song = 0;
      //return the previous song info
      return this.songsQueue.move_to_prev()?.getSongInfoWithBody();

    }

    //swap songs in the queue will put item at old_position at new position
    swap_songs(old_position : number, new_position : number) : number {
      return this.songsQueue.swap_elements(old_position,new_position);
    }

    has_next() : boolean {
      return this.songsQueue.has_next();
    }

    has_prev() : boolean {
      return this.songsQueue.has_prev();
    }
  }