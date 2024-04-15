//this class is ment for messaging with the user
import { Song } from "./Song";
import { Queue, SongsQueue } from "./Queue";
import { RoomController } from "./RoomController";


const url = "https://www.nagnu.co.il/%D7%90%D7%A7%D7%95%D7%A8%D7%93%D7%99%D7%9D/%D7%A0%D7%95%D7%A2%D7%94_%D7%A7%D7%99%D7%A8%D7%9C,_%D7%A9%D7%92%D7%99%D7%90_%D7%A7%D7%A8%D7%99%D7%91,_%D7%A4%D7%95%D7%A8%D7%90%D7%91%D7%A8_%D7%AA%D7%9C_%D7%90%D7%91%D7%99%D7%91/%D7%A4%D7%A8%D7%95%D7%91%D7%95%D7%A7%D7%98%D7%99%D7%91%D7%99%D7%AA";

//const song = new Song(" (פסח) מה נשתנה","חגים ומועדים");
const queUWU = new SongsQueue();
//queUWU.addToQueueByName(' (פסח) מה נשתנה',"חגים ומועדים" )

//easy
//console.log((queUWU.getCurrentSong()));
//queUWU.addToQueueFromUrl(url);

//queUWU.search_song("","חגים ומועדים");

//queUWU.addToQueueByName(" (פסח) מה נשתנה","חגים ומועדים" );



const encodedUrl = encodeURIComponent(url);
//console.log(encodedUrl);

//const decodedUrl = decodeURIComponent(encodedUrl);

//console.log(decodedUrl);

const roomController = new RoomController()
roomController.hostRoom("");
roomController.add_song_to_queue("0","38","פאר טסי")
roomController.add_song_to_queue("0","38","פאר טסי")
roomController.add_song_to_queue("0","38","פאר טסי")
roomController.get_song_from_url("0",url).then(() => console.log(roomController.get_top_queue("0")))
