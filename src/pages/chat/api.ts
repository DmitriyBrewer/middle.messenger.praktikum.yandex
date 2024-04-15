import BaseAPI from "../../lib/baseApi";
import { mapDataToEntriesArray } from "../../lib/convertData";
import { METHODS } from "../../lib/http";

class ChatAPI extends BaseAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        super();
        this.baseUrl = baseUrl;
    }

    public getAllChats() {
        return this.get(`${this.baseUrl}/api/v2/chats`,{timeout:15000});
    }

    public deleteChat(data: Record<string, string>) {
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

    public chatToken(data: Record<string, string>) {
        return this.post(`${this.baseUrl}/api/v2/chats/token/${data.id}`, {
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data),
        });
    }

    public addUserToChat(userData: Record<string, any>) {
        const usersRequest = {
            users: [Number(userData.users)],
            chatId: Number(userData.chatId)
        };

        console.log(JSON.stringify(usersRequest));

        return this.put(`${this.baseUrl}/api/v2/chats/users`, {
            method: METHODS.PUT,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usersRequest)
        });
    } 

    public deleteUserToChat(userData: Record<string, any>) {
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
            body: JSON.stringify(usersRequest)
        });
    }
}

export default ChatAPI;
