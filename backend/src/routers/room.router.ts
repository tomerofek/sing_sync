import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { io } from "../server";
import { Room } from "../Room";
import { RoomController } from "../RoomController";
import { GET_SONG_URL, GET_TOP_QUEUE, HOST_ROOM_URL, JOIN_ROOM_URL } from "./urls";
import { handle_get } from "./routerWrapper";

const router = Router();
const roomContoller = new RoomController();

/*
router.get("/get_song_from_url/:room_id/:url", asyncHandler(
   async (req, res) => {
       
      const room_id = req.params.room_id;
      const url = decodeURIComponent(req.params.url);
      console.log(room_id)
      console.log(url)
      const lior_ohev_nim = new Room(123);
      await lior_ohev_nim.add_song_from_url(url);
      const song = lior_ohev_nim.get_song(); 
      res.send({status : "ok", song_body : song.getSongData(), song_author : song.getSongAuthor(), song_name : song.getSongName()})
  }
  ))
  */

// joins a room with the room_id if exists
// if not exists returns a response with “Invalid ID” status
const joinRoom = (paramsMap: { [key: string]: any }) => roomContoller.joinRoom(paramsMap['room_id'])
handle_get(joinRoom, JOIN_ROOM_URL, 'room_id')

// hosts a new room and returns a response with the new room_id
router.get(HOST_ROOM_URL, asyncHandler(
    async (req, res) => {
        try {
            const result = roomContoller.hostRoom('');
            console.log(result)
            res.send({status: 'ok', content: result})
        } catch (error) {
            res.send({status: 'error', content: error})
        }
    }
))

// returns a response with the song that currently playing in the room with room_id
// if not exists returns a response with “Invalid ID” status
const getCurrentSong = (paramsMap: { [key: string]: any }) => roomContoller.get_current_song(paramsMap['room_id'])
handle_get(getCurrentSong, GET_SONG_URL, 'room_id')
 



   
   export default router;