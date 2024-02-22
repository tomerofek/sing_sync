import { MongoClient, Db , ObjectId} from 'mongodb';
import { Queue } from './Queue';
// MongoDB connection URI
//need to encrypt this password
const uri = "mongodb+srv://final-project:kGSCzCjKDuKF7NGD@noder.2cvtm9i.mongodb.net/?retryWrites=true&w=majority";

//getting songs from the db as JSON object - returns a promise
async function getSongJSON(id : string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(uri);
      
      try {
  
        await client.connect();
        console.log('Connected to MongoDB');
        
        const database: Db = client.db("SingSync");
        const collection = database.collection("songs");
  
        // Fetch the JSON object from the collection (you can adjust the query as needed)
        //TODO add the id check
        //const id_for_db = new ObjectId(id)
        const jsonObject = await collection.findOne({ _id: id } as any);
        if (jsonObject) {
          console.log('Retrieved JSON object:');
          resolve(jsonObject);
        } else {
          console.log("banot")
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

  //converts the JSON into a record
  //i got scammed this isnt needed
  function convertJsonToRecord(obj: any): Record<string, any> {
    if (typeof obj !== 'object' || obj === null) {
        throw new Error('Input is not a valid JSON object.');
      }
    const { id, ...rest } = obj;
    const record: Record<string, any> = {};
  
    record[id] = rest;
    
    return record;
  }


export class Song {

    private songData: JSON | null; // JSON object containing song data
    private songName: string; // Name of the song
    private songAuthor: string; // Author of the song





    //constructor using optional song param - if song not provided we search it
    
    constructor(songName: string, songAuthor: string) {
        console.log("untill when");
        this.songData = null;
        this.songAuthor = songAuthor;
        this.songName = songName;
        const id_for_db = songName + "_" + songAuthor;
        
    }

    //gets the id for the db and that callback function to what to do after object is initialized
    init_data() : any {
      
      const id_for_db = this.getSongName() + "_" + this.getSongAuthor();
      console.log("ho no " + id_for_db)
      return getSongJSON(id_for_db).then((result) => {
        this.songData = result;
        //below is what we do after the resolve
        console.log(this.songData)
    }).catch((error) => {
        this.songData = null;
        console.error('Promise rejected with error: ' + error);
        throw error;
      });
    }

    isEmptyObject(obj: Record<string, any>): boolean {
        return Object.keys(obj).length === 0;
    }

    // Method to get the JSON object of the song data
    getSongData(): JSON|null {
        return this.songData;
    }

    // Method to get the name of the song
    getSongName(): string {
        return this.songName;
    }

    // Method to get the author of the song
    getSongAuthor(): string {
        return this.songAuthor;
    }

    // Method to set the JSON object of the song data
    setSongData(newSongData: JSON): void {
        this.songData = newSongData;
    }

    // Method to set the name of the song
    setSongName(newSongName: string): void {
        this.songName = newSongName;
    }

    // Method to set the author of the song
    setSongAuthor(newSongAuthor: string): void {
        this.songAuthor = newSongAuthor;
    }
}
