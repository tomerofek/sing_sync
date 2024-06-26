import { Router } from "express";
import { io, roomController } from "../server";
import { SEARCH_SONG_FROM_DB,GET_TOP_QUEUE, GET_ALL_QUEUE ,buildUrl, GET_SONG_FROM_URL, REMOVE_SONG_FROM_QUEUE, ADD_SONG_TO_QUEUE, PREVIOUS_SONG, REORDER_QUEUE, HAS_NEXT_SONG, HAS_PREV_SONG} from "./urls";
import { handle_get } from "./routerWrapper";
import asyncHandler from 'express-async-handler';
import { SongInfo } from "../Queue";
import { Response } from "../response";
const router = Router()






// returns a list with json representing the names and author of the first 2 songs in the queue after the current song
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(GET_TOP_QUEUE, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result = roomController.get_top_queue(room_id)

            if(result != undefined){
                io.to(room_id).emit("topOfQueue", result);
            }

            res.send(new Response(result)) //FIX ME
        } catch (error: any) {
            res.send(new Response(undefined,error.message))
        }
    }
))


// returns a list with json representing the names and author of all the songs in the queue after the current song
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(GET_ALL_QUEUE, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result = roomController.get_all_queue(room_id)
            res.send(new Response(result))
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))

// removes a song from the queue from a given position returns a status
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(REMOVE_SONG_FROM_QUEUE, 'room_id', 'songs_to_remove_positions'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        const songs_to_remove_positions = req.params.songs_to_remove_positions
        try {
            //turn into a list of strings each is a number 
            const songs_to_remove_positions_stinrg_list = songs_to_remove_positions.split(',')
            //turn into a list of integers
            const songs_to_remove_positions_as_int = new Array<number>(songs_to_remove_positions_stinrg_list.length)
            for(let i = 0; i < songs_to_remove_positions_stinrg_list.length; i++){
                songs_to_remove_positions_as_int[i] = parseInt(songs_to_remove_positions_stinrg_list[i])
            }

            
            res.send(new Response(roomController.remove_song_from_queue(room_id,songs_to_remove_positions_as_int)))
            io.to(room_id).emit("topOfQueue", roomController.get_top_queue(room_id));
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))
// returns a list with json representing the names and author of all the songs in the queue after the current song
// if not exists returns a response with “Invalid ID” status
//either the song name or the length must be at least size bigger then 2 
router.get(buildUrl(SEARCH_SONG_FROM_DB, 'search_term'), asyncHandler(
    async (req, res) => {
        const search_term = req.params.search_term === '$' ? '' : req.params.search_term;
        try {
            console.log(`[LOG] recieved SEARCH SONG FROM DB request. params: ${search_term}`)
            const result = await roomController.search_song_from_db(search_term);
            console.log(`[LOG] result: ${result}`)
            res.send(new Response(result)) 
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))

// add a song with song name and author to the end of the queue in room_id
// if room not exists returns a response with “Invalid ID” status
// if song_id not exists returns a response with “Invalid song ID” status
router.get(buildUrl(ADD_SONG_TO_QUEUE, 'room_id', 'song_name', 'song_author'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        const song_name = req.params.song_name
        const song_author = req.params.song_author
        try {
            await roomController.add_song_to_queue(room_id, song_name, song_author)
            let qLen = roomController.get_queue_len(room_id) //queue len AFTER the addition of the song
            if(qLen <= 3)
                io.to(room_id).emit("topOfQueue", roomController.get_top_queue(room_id));
            
            if(qLen === 1){
                io.to(room_id).emit("song", roomController.get_current_song(room_id));
                io.to(room_id).emit("position", roomController.get_current_position(room_id));
            }
            
            res.send(new Response('ok')) //FIX ME
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))

// add a song from the provided url to the queue in room with room_id
// if room not exists returns a response with “Invalid ID” status
// if url not exists/supported returns a response with “Invalid URL” status
router.get(buildUrl(GET_SONG_FROM_URL, 'room_id', 'url'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        const url = decodeURIComponent(req.params.url)
        try {
            const result : SongInfo = await roomController.get_song_from_url(room_id, url)
            if(result == undefined)
                throw Error('result is undefined')

            let qLen = roomController.get_queue_len(room_id)
            if(qLen <= 3)
                io.to(room_id).emit("topOfQueue", roomController.get_top_queue(room_id));
            
            if(qLen === 1){
                let songInfo = roomController.get_current_song(room_id);
                console.log(songInfo)
                io.to(room_id).emit("song", songInfo);
                io.to(room_id).emit("position", roomController.get_current_position(room_id));
            }
            res.send(new Response(result))
        } catch (error: any) {
            console.log("found axois error" + error);
            res.send(new Response(undefined, error.message))
        }
    }
))

// get the previous songInfo from the queue in room with room_id and move the queue backward and reset position in the song
// if room not exists returns a response with “Invalid ID” status
// if index == 0 in the song queue than returns a response with "there is no previous song" status
router.get(buildUrl(PREVIOUS_SONG, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result : SongInfo | undefined = roomController.previous_song(room_id)
            //send
            io.to(room_id).emit("topOfQueue", roomController.get_top_queue(room_id));
            io.to(room_id).emit("song", result);
            io.to(room_id).emit("position", roomController.get_current_position(room_id));
            res.send(new Response(result))
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))


// get the previous songInfo from the queue in room with room_id and move the queue backward and reset position in the song
// if room not exists returns a response with “Invalid ID” status
// if index == 0 in the song queue than returns a response with "there is no previous song" status
router.get(buildUrl(REORDER_QUEUE, 'room_id', 'old_position', 'new_position'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        const old_position = req.params.old_position
        const new_position = req.params.new_position
        try {
            //send the needed broadcasts to change the way the top of queue looks like
            io.to(room_id).emit("topOfQueue", roomController.get_top_queue(room_id));
            const result : number | undefined = roomController.swap_song(room_id,parseInt(old_position),parseInt(new_position))
            if(result == undefined)
                throw Error('cannot fetch current index after swap')
            io.to(room_id).emit("topOfQueue", roomController.get_top_queue(room_id));
            res.send(new Response(result))
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))


// return whether there is a next song in the queue
router.get(buildUrl(HAS_NEXT_SONG, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            //send the needed broadcasts to change the way the top of queue looks like
            const result : boolean = roomController.has_next(room_id)
            res.send(new Response(result))
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))


// return whether there is a next song in the queue
router.get(buildUrl(HAS_PREV_SONG, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            //send the needed broadcasts to change the way the top of queue looks like
            const result : boolean = roomController.has_prev(room_id)
            res.send(new Response(result))
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))

export default router;