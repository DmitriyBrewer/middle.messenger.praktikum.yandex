export type UserData = {
    users: string | number[]
    chatId: number | string
}


export type ChatData = { 
    title:string,
    avatar:null | string,
    id:number | string,
    userId: number | string,
}

export type ChatId = { chatId: number }
