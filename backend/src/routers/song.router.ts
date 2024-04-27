import { Router, response } from "express";
import { io, roomController } from "../server";
import { ADVANCE_POSITION, ADVANCE_SONG, GET_POSITION, GET_SONG_URL, GET_TOP_QUEUE, HOST_ROOM_URL, JOIN_ROOM_URL, PREVIOUS_POSITION, buildUrl } from "./urls";
import { handle_get } from "./routerWrapper";
import asyncHandler from 'express-async-handler';
import { Song } from "../Song";
import { SongInfo } from "../Queue";
import { Response } from "../response";

const router = Router()

// returns a response with the song that currently playing in the room with room_id
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(GET_SONG_URL, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            console.log(`[LOG] recieved GET SONG request. params: ${room_id}`)
            const result : SongInfo | undefined = roomController.get_current_song(room_id)
            if(result == undefined && roomController.get_queue_len(room_id) !== 0)
                throw Error(`result is undefined while queue isn't empty`)
            
            console.log('[LOG] result: ' + result);
            res.send({status: 'ok', content: result}) //FIX ME

        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))

// returns a response with the position in currently played song
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(GET_POSITION, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            console.log(`[LOG] recieved GET POSITOIN request. params: ${room_id}`)
            const result = roomController.get_current_position(room_id)
            res.send(new Response(result)) //FIX ME
            console.log('[LOG] result: ' + result)
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))


// returns a response with the position in currently played song
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(ADVANCE_POSITION, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            console.log(`[LOG] recieved ADVANCE_POSITION request. params: ${room_id}`)
            const result = roomController.advance_position(room_id)

            if(result != undefined){
                io.to(room_id).emit("position", result);
            }
            //res.send({status : "ok"});
            res.send(new Response(result))
            console.log('[LOG] result: ' + result)
        } catch (error: any) {
            res.send(new Response(undefined, error.message))
        }
    }
))

// reduces the position in the played song in the room with room_id
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(PREVIOUS_POSITION, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            console.log(`[LOG] recieved PREVIOUS_POSITION request. params: ${room_id}`)
            const result = roomController.previous_position(room_id)
            if(result != undefined){
                io.to(room_id).emit("position", result);
            }
            //res.send({status : "ok"});
            res.send(new Response(result)) //FIX ME
            console.log('[LOG] result: ' + result)
        } catch (error : any) {
            res.send(new Response(undefined, error.message))
        }
    }
))

// advances to the next song in the queue in room with room_id
// if room not exists returns a response with “Invalid ID” status
router.get(buildUrl(ADVANCE_SONG, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            console.log(`[LOG] recieved ADVANCE_SONG request. params: ${room_id}`)
            const result = roomController.advance_song(room_id)
            if(result == undefined && roomController.get_queue_len(room_id) > 0)
                throw Error(`result is undefined and the queue isn't empty`)

            console.log('[LOG] result: ' + result);
            io.to(room_id).emit("song", result);
            io.to(room_id).emit("position", roomController.get_current_position(room_id));

            const queueRes = roomController.get_top_queue(room_id)
            if(queueRes == undefined)
                throw Error('queue result is undefined')
            io.to(room_id).emit("topOfQueue", queueRes)
            
            res.send(new Response(result)) //FIX ME
        } catch (error : any) {
            res.send(new Response(undefined, error.message))
        }
    }
))
/*
router.post(buildUrl(SEND_HELLO_URL, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        const message = req.body.message; // Assuming the message is sent in the request body
        // Debugging
        // console.log(`Room ID: ${room_id}`);
        // console.log(`Message: ${message}`);
        io.to(room_id).emit("broadcast", message);
        res.send({status : "ok"});
    }
))*/


export default router;