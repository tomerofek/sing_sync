
export interface Response<T>{
    status: string;
    content?: T;
    error?: string;
}