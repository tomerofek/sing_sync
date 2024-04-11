import { Song, add_song_to_db } from "./Song";
import { MongoClient, Db , ObjectId} from 'mongodb';
import {spawnSync } from "child_process";

//TODO test to queue by song name and author and fix the queue to work thread safe - also lock on the add to queue functionalities
//a simple queue implementation
const uri = "mongodb+srv://final-project:kGSCzCjKDuKF7NGD@noder.2cvtm9i.mongodb.net/?retryWrites=true&w=majority";

async function getSongNames(song_name : string ,song_author : string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      
      try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database: Db = client.db("SingSync");
        const collection = database.collection("songs");
        //easy to see that this is trivial to add to our code
        const escapedSongName = song_name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const escapedSongAuthor = song_author.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        //the query i sent to mongo db (trivial)
        
        const array_of_songs = await collection.find({
            $and: [
                { song_name: { $regex: new RegExp(`.*${escapedSongName}.*`, 'i') } },
                { song_author: { $regex: new RegExp(`.*${escapedSongAuthor}.*`, 'i') } }
                ]
            }).toArray();
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

  //replace this class with thread safe one
export class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    peek(): T | undefined {
        return this.items.length > 0 ? this.items[0] : undefined;
    }

    size(): number {
        return this.items.length;
    }

    remove(index : number): void {
        if (index !== -1) {
            this.items.splice(index, 1);
        }
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
    search_song(song_name : string, author_name : string) : any {
        return getSongNames(song_name,author_name).then((result) => {
            //TODO add here calledback to calling function - probably send to user side - probably send to user side
          
            console.log(result);
            return result;
        }).catch(error => {
            throw new Error('An error occurred while processing the data');
    });
    }

    
    //add song using url to the db and insert to queue
    async addToQueueFromUrl(url : string) : Promise<void> {
      return new Promise(async (resolve) => {
        //make empty song
        const song = new Song("","");
        //update song with the data from the url
        await this.scrapeSong(url,song);
        //the song in the queue might not be complete
        this.addToQueue(song)
        //add the song to the database
        await add_song_to_db(song);
        //this resolve is for debugging the song should be added to the queue by now
        console.log(song);
        resolve();
      })

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
      this.songsQueue.dequeue();
      //return the next song in the queue
      return this.songsQueue.peek();
      //TODO broadcast notification to the other users using express
    }

    advance_position_in_song() : number {
      //returns the index which is the next part in the song (might want to change to status)
      return this.current_position_in_song++;
    }

    //retuned -1 in case of error
    previous_position_in_song() : number {
      //returns the index which is the previous part in the song (might want to change to status)
      if(this.current_position_in_song > 0){
        return -1;
      }
      return this.current_position_in_song--;
    }

    //returns the current song
    getCurrentSong() : Song | undefined{
      return this.songsQueue.peek();
      //TODO broadcast notification to the other users using express
      
    }

    //returns the next song in the queue
    addToQueueByName(song_name : string, song_author : string) : Promise<any>{
      const song = new Song(song_name,song_author)
      //gets the promise to know when the action is over
      const returnval = song.init_data();
      //adds the song to the queue
      this.addToQueue(song);
      return returnval;
    }
    
    remove_song_from_queue(song_to_remove_position : number) : void {
      this.songsQueue.remove(song_to_remove_position);
    }
  }