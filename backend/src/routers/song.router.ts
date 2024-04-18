import { Router } from "express";
import { roomContoller } from "../server";
import { ADVANCE_POSITION, ADVANCE_SONG, GET_POSITION, GET_SONG_URL, GET_TOP_QUEUE, HOST_ROOM_URL, JOIN_ROOM_URL, PREVIOUS_POSITION, buildUrl } from "./urls";
import { handle_get } from "./routerWrapper";
import asyncHandler from 'express-async-handler';
import { Song } from "../Song";

const router = Router()

// returns a response with the song that currently playing in the room with room_id
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(GET_SONG_URL, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            console.log(`[LOG] recieved GET SONG request. params: ${room_id}`)
            const result : Song = roomContoller.get_current_song(room_id)
            let song_body = result.getSongData();
            let song_name = result.getSongName();
            let song_author = result.getSongAuthor();
            let json_to_send = {}
            console.log('[LOG] result: ' + result)
            res.send({status: result ? 'ok' : 'error', content: "lol"}) //FIX ME
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
            const result = roomContoller.get_current_position(room_id)
            res.send({status: result ? 'ok' : 'error', content: result}) //FIX ME
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))


// returns a response with the position in currently played song
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(ADVANCE_POSITION, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result = roomContoller.advance_position(room_id)
            res.send({status: result ? 'ok' : 'error', content: result}) //FIX ME
        } catch (error: any) {
            res.send({status: 'error', content: error.message})
        }
    }
))

// reduces the position in the played song in the room with room_id
// if not exists returns a response with “Invalid ID” status
router.get(buildUrl(PREVIOUS_POSITION, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result = roomContoller.previous_position(room_id)
            res.send({status: result ? 'ok' : 'error', content: result}) //FIX ME
        } catch (error) {
            res.send({status: 'error', content: error})
        }
    }
))

// advances to the next song in the queue in room with room_id
// if room not exists returns a response with “Invalid ID” status
router.get(buildUrl(ADVANCE_SONG, 'room_id'), asyncHandler(
    async (req, res) => {
        const room_id = req.params.room_id
        try {
            const result = roomContoller.advance_song(room_id)
            res.send({status: result ? 'ok' : 'error', content: result}) //FIX ME
        } catch (error) {
            res.send({status: 'error', content: error})
        }
    }
))


export default router;