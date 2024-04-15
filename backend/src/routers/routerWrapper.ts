import { Router } from "express";
import asyncHandler from 'express-async-handler';

export function handle_get(router: Router, f: (x: { [key: string]: any }, req: any) => any, url: string, ...params: string[]){
    const paramsString = (params.length > 0 ? '/:' : '') + params.join('/:');
    router.get(`${url}${paramsString}`, asyncHandler(
        async (req, res) => {
            const paramsMap: { [key: string]: any } = {};
            params.forEach(param => paramsMap[param] = req.params[param]);
            try {
                const result = f(paramsMap, req)
                res.send({status: result ? 'ok' : 'error', content: result})
            } catch (error: any) {
                res.send({status: 'error', content: error.message})
            }
        }
    ))
}
