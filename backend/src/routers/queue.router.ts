import { Router } from "express";
import { io, roomContoller } from "../server";
import { SEARCH_SONG_FROM_DB,GET_TOP_QUEUE, GET_ALL_QUEUE ,buildUrl, GET_SONG_FROM_URL, REMOVE_SONG_FROM_QUEUE, ADD_SONG_TO_QUEUE} from "./urls";
import { handle_get } from "./routerWrapper";
import asyncHandler from 'express-async-handler';
const router = Router()






// returns a list with json representing the names and author of the first 2 songs in the queue after the current song
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(GET_TOP_QUEUE, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result = roomContoller.get_top_queue(room_id)

            if(result != undefined){
                io.to(room_id).emit("topOfQueue", result);
            }

            res.send({status: result ? 'ok' : 'error', content: result}) //FIX ME
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))


// returns a list with json representing the names and author of all the songs in the queue after the current song
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(GET_ALL_QUEUE, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result = roomContoller.get_all_queue(room_id)
            res.send({status: result ? 'ok' : 'error', content: result}) //FIX ME
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))

// removes a song from the queue from a given position returns a status
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(REMOVE_SONG_FROM_QUEUE, 'room_id', 'song_to_remove_position'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        const song_to_remove_position = req.params.song_to_remove_position
        try {
            roomContoller.remove_song_from_queue(room_id,parseInt(song_to_remove_position))
            res.send({status: 'ok'})
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))
// returns a list with json representing the names and author of all the songs in the queue after the current song
// if not exists returns a response with “Invalid ID” status
//either the song name or the length must be at least size bigger then 2 
router.get(buildUrl(SEARCH_SONG_FROM_DB, 'song_name', 'song_author'), asyncHandler(
    async (req, res) => {
        const song_name = req.params.song_name === '$' ? '' : req.params.song_name;
        const song_author = req.params.song_author === '$' ? '' : req.params.song_author;
        try {
            console.log(`[LOG] recieved SEARCH SONG FROM DB request. params: ${song_name} | ${song_author}`)
            const result = await roomContoller.search_song_from_db(song_name,song_author);
            console.log(`[LOG] result: ${result}`)
            res.send({status: result ? 'ok' : 'error', content: result}) 
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
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
            await roomContoller.add_song_to_queue(room_id, song_name, song_author)
            res.send({status : 'ok'}) //FIX ME
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))

// add a song from the provided url to the queue in room with room_id
// if room not exists returns a response with “Invalid ID” status
// if url not exists/supported returns a response with “Invalid URL” status
router.get(buildUrl(GET_SONG_FROM_URL, 'room_id', 'url'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        const url = decodeURI(req.params.url)
        try {
            await roomContoller.get_song_from_url(room_id, url)
            res.send({status : 'ok'})
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))

export default router;