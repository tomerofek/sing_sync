import { Router } from "express";
import asyncHandler from 'express-async-handler';

import { io } from "../server";
const router = Router();


router.get("/noder", asyncHandler(
 async (req, res) => {
    console.log("all works now!");
    // Send "hello" to all clients in broadcast
    io.emit("broadcast", "hello");
    res.send({status : "ok"});
    return;
}
))

   



   
   export default router;