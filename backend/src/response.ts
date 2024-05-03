export class Response<T>{
    status !: string;
    content : T | undefined;
    error : string | undefined;

    constructor(result?: T, error?: string){
        this.content = result === 'ok' ? undefined : result;
        this.error = error;
        this.status = error !== undefined ? 'error' : 'ok';
    }

    toJson(){
        return {
            status: this.status,
            ...(this.content!==undefined && { content:this.content }),
            ...(this.error!==undefined && { error:this.error })
        }
    }
}

