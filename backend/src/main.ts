//this class is ment for messaging with the user
import { Song } from "./Song";
import { Queue, SongsQueue } from "./Queue";
import { RoomController } from "./RoomController";


const url = "https://www.nagnu.co.il/%D7%90%D7%A7%D7%95%D7%A8%D7%93%D7%99%D7%9D/%D7%94%D7%A4%D7%99%D7%9C_%D7%94%D7%9B%D7%97%D7%95%D7%9C/%D7%A9%D7%9E%D7%99%D7%99%D7%9D_%D7%9E%D7%9C%D7%90%D7%99%D7%9D_%D7%9B%D7%95%D7%9B%D7%91%D7%99%D7%9D";

//const song = new Song(" (פסח) מה נשתנה","חגים ומועדים");
const queUWU = new SongsQueue();
//queUWU.addToQueueByName(' (פסח) מה נשתנה',"חגים ומועדים" )

//easy
//console.log((queUWU.getCurrentSong()));
queUWU.addToQueueFromUrl(url);

//queUWU.search_song("","חגים ומועדים");

//queUWU.addToQueueByName(" (פסח) מה נשתנה","חגים ומועדים" );


const encodedUrl = encodeURIComponent(url);


//console.log(encodedUrl);

//const decodedUrl = decodeURIComponent(encodedUrl);

//console.log(decodedUrl);

const roomController = new RoomController()
roomController.hostRoom("");

