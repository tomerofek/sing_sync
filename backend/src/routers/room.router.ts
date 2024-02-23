import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { Room } from "../Room";
const router = Router();


router.get("/get_song_from_url/:room_id/:url", asyncHandler(
    async (req, res) => {
        
       const room_id = req.params.room_id;
       const url = req.params.url;
       console.log(room_id)
       console.log(url)
       const lior_ohev_nim = new Room(123);
       lior_ohev_nim.add_song_from_url(url)
       const song = lior_ohev_nim.get_song();
       res.send({status : "ok", song_body : song.getSongData(), song_author : song.get_song_author(), song_name : song.get_song_name()})
   }
   ))
   router.get("/noder", asyncHandler(
    async (req, res) => {
        console.log("all works now!")
        res.send({status : "ok"})
        return;
   }
   ))

   
   export default router;