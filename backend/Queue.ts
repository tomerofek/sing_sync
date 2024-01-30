//List of stuff TODO : add custom song, reordering songs ? - nth , and voting system

import { Song } from "./Song";
import { MongoClient, Db , ObjectId} from 'mongodb';
import { spawn, spawnSync } from "child_process";

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
          console.log("noder bseder");
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
    removeItemAtIndex(index : number) : void{
      //checks if the item we want to remove is in the start or middle of the queue or in the end of it
      if(index < this.items.length - 1){
        //remove the item in the middle or start
        this.items = this.items.slice(0,index).concat(this.items.slice(index + 1,this.items.length));
      }else{
        //remove only last item
        this.items = this.items.slice(0,index);
      }
    }
}
//the queue of songs uses the Queue implementation
export class SongsQueue{
    private songsQueue : Queue<Song>;

    constructor() {
        this.songsQueue = new Queue();
    }

    //for user search function - return the list of results to user
    search_song(song_name : string, author_name : string) : any {
        return getSongNames(song_name,author_name).then((result) => {
            console.log(result);
            return result;
        }).catch(error => {
            throw new Error('An error occurred while processing the data');
    });
    }

    //adds a song to the database - the mongoDB from a given url
    addToDBFromUrl(url : string) : any {
      //using the python script we made for uploading the url to the databsae using shell activation
      const pythonProcess = spawnSync('python',["backend\\song_db_-_python_scripts\\url2song.py",url]);
      if (pythonProcess.stdout && pythonProcess.stdout.length > 0) 
        return pythonProcess.stdout.toString();
      
      console.log("Python Script Output:", pythonProcess.stdout?.toString());
      console.error("Python Script Errors:", pythonProcess.stderr?.toString());

        
    }

    //add song using url to the db and insert to queue
    addToQueueFromUrl(url : string) : void {
      //let us first add the song to our songs database for future usage
      const songName_and_author = this.addToDBFromUrl(url).replace(/\n/g, '').trim().split('_');
      songName_and_author[0] = songName_and_author[0].trim();
      songName_and_author[1] = songName_and_author[1].trim();
      //lets create a new song object using what we added ( can change python code to make this step not needed)
      const song : Song = new Song(songName_and_author[0],songName_and_author[1]);
      this.songsQueue.enqueue(song);
    }

    //skip song and returns the next song in the queue - or undefined in case of an error/end of queue 
    skipSong() : Song | undefined {
      this.songsQueue.dequeue();
      return this.songsQueue.peek();
      //TODO broadcast notification to the other users using express
    }
    
        //skip song and returns the next song in the queue - or undefined in case of an error/end of queue 
        removeSong(indexToRemove : number) : void {
          this.songsQueue.removeItemAtIndex(indexToRemove);
          //TODO change the way the queue look for the other users
        }
  }