import { Router } from "express";
import { HOST_ROOM_URL, JOIN_ROOM_URL, buildUrl } from "./urls";
import { handle_get } from "./routerWrapper";
import { roomContoller, io } from "../server";
import asyncHandler from 'express-async-handler';

const router = Router();

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
router.get(buildUrl(JOIN_ROOM_URL, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result = roomContoller.joinRoom(room_id)
            res.send({status: result ? 'ok' : 'error', content: result}) //FIX ME
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))

// hosts a new room and returns a response with the new room_id
router.get(buildUrl(HOST_ROOM_URL), asyncHandler(
    async (req, res) => {
        try {
            const result = roomContoller.hostRoom('') //fixme
            res.send({status: result != undefined ? 'ok' : 'error', content: result})
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))


 


export default router;