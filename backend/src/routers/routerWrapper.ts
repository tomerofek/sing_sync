import { Router } from "express";
import asyncHandler from 'express-async-handler';

const router = Router();

export function handle_get(f: (x: { [key: string]: any }) => any, url: string, ...params: string[]){
    const paramsString = (params.length > 0 ? '/:' : '') + params.join('/:');
    router.get(`${url}${paramsString}`, asyncHandler(
        async (req, res) => {
            const paramsMap: { [key: string]: any } = {};
            params.forEach(param => paramsMap[param] = req.params[param]);
            try {
                res.send({status: 'ok', content: f(paramsMap)})
            } catch (error) {
                res.send({status: 'error', content: error})
            }
        }
    ))
}
