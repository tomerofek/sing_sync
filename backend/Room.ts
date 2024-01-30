//TODO all room main features
import { SongsQueue } from "./Queue";
import { Song } from "./Song";

export class Room {
    private roomManager : string;
    private users: string[]; // Array of user IDs - to be replaced with identifires
    private songsQueue: SongsQueue; //the queue of this room

    constructor(roomManager : string) {
        this.roomManager = roomManager;
        this.users = [];
        this.songsQueue = new SongsQueue();
    }

    // Method to add a user to the room
    addUser(userId: string): void {
        this.users.push(userId);
    }

    // Method to remove a user from the room
    removeUser(userId: string): void {
        const index = this.users.indexOf(userId);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }

    // Method to get the list of users in the room
    getUsers(): string[] {
        return this.users;
    }

    // Method to add a song to the queue from a URL
    addSongToQueueFromUrl(url: string): void {
        this.songsQueue.addToQueueFromUrl(url);
    }

    // Method to skip the current song in the queue
    skipCurrentSong(): Song | undefined {
        return this.songsQueue.skipSong();
    }

    // Method to remove a song from the queue by index
    removeSongFromQueue(index: number): void {
        this.songsQueue.removeSong(index);
    }

    getRoomManager() : string{
        return this.roomManager;
    }


}