export type UserData = {
    // TODO
    // avatar: string;
    // display_name: string | null;
    // email: string;
    // first_name: string;
    // id: number;
    // login: string;
    // phone: string;
    // second_name: string;
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
