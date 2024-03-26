import { Song } from "./Song";

export interface Response<T>{
    status: string;
    content?: T;
}