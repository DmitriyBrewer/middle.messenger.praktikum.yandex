import BaseAPI from "../../lib/http/baseApi";
import { mapDataToEntriesArray } from "../../lib/convertData";
import { METHODS, Options } from "../../lib/http/http";
import { ChatData, ChatId, UserData } from "./type";

class ChatAPI extends BaseAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        super();
        this.baseUrl = baseUrl;
    }

    public getAllChats() {
        return this.get(`${this.baseUrl}/api/v2/chats`,{timeout:15000});
    }

    public deleteChat(data: ChatId) {
        return this.delete(`${this.baseUrl}/api/v2/chats`, {
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data),
        });
    }

    public addChat(data: Record<string, string>) {
        return this.post(`${this.baseUrl}/api/v2/chats`, {
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data),
        });
    }

    public chatToken(data: ChatData) {
        return this.post(`${this.baseUrl}/api/v2/chats/token/${data.id}`, {
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data),
        });
    }

    public addChatAvatar(file: File, chatId: number) {
        const data = new FormData();
        data.append("chatId", chatId.toString());
        data.append("avatar", file, file.name);
    
        const options: Options = {
            method: METHODS.PUT,
            data: data,
            headers: {
                "Accept": "application/json"
            }
        };
    
        return this.put(`${this.baseUrl}/api/v2/chats/avatar`, options);
    }

    public addUserToChat(userData: UserData) {
        const usersRequest = {
            users: [Number(userData.users)],
            chatId: Number(userData.chatId)
        };

        return this.put(`${this.baseUrl}/api/v2/chats/users`, {
            method: METHODS.PUT,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: usersRequest
        });
    } 

    public deleteUserToChat(userData: UserData) {
        const usersRequest = {
            users: [Number(userData.users)],
            chatId: Number(userData.chatId)
        };

        return this.delete(`${this.baseUrl}/api/v2/chats/users`, {
            method: METHODS.DELETE,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: usersRequest
        });
    }
}

export default ChatAPI;
