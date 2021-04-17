
export interface url {
    _id:string,
    originalUrl: string;
    urlCode:string;
    shortUrl: string;
    redirects:string;
    createdAt: Date;
    updatedAt: Date;
}

export interface urlResponse {
    success: boolean;
    message:String;
    data:url;
}
