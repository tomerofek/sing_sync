import { Router } from "express";
import { CLOSE_ROOM_URL, HOST_ROOM_URL, JOIN_ROOM_URL, buildUrl } from "./urls";
import { handle_get } from "./routerWrapper";
import { roomController, io } from "../server";
import asyncHandler from 'express-async-handler';
import { Response } from "../response";

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
            const result = roomController.joinRoom(room_id)
            res.send(new Response(result)) //gets only the result from the response - no need for error
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))

// hosts a new room and returns a response with the new room_id
router.get(buildUrl(HOST_ROOM_URL), asyncHandler(
    async (req, res) => {
        try {
            const result = roomController.hostRoom('') 
            res.send(new Response(result))
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))
router.get(buildUrl(CLOSE_ROOM_URL,'room_id'), asyncHandler(
    async (req, res) => {
        try {
            const room_id = req.params.room_id
            roomController.close_room(room_id)
            io.to(room_id).emit("closeRoom")
            res.send(new Response('ok'))
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))


export default router;