export class Response<T>{
    status!: string;
    content?: T;
    error?: string;

    constructor(result?: T, error?: string){
        this.content = result;
        this.error = error;
        this.status = result === undefined ? (error === undefined ? 'ok' : 'error') : 'ok';
    }

    toJson(){
        return {
            status: this.status,
            ...(this.content!==undefined && { content:this.content }),
            ...(this.error!==undefined && { error:this.error })
        }
    }
}

