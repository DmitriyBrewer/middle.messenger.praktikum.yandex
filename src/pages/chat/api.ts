import BaseAPI from "../../lib/baseApi";
import { mapDataToEntriesArray } from "../../lib/convertData";

class ChatAPI extends BaseAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        super();
        this.baseUrl = baseUrl;
    }

    public getAllChats() {
        return this.get(`${this.baseUrl}/api/v2/chats`);
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
    public addUserToChat(userData: Record<string, string>) {
        return this.put(`${this.baseUrl}/api/v2/chats/users`, {
            headers: [
                "Content-Type", "application/json",
            ],
            data: mapDataToEntriesArray(userData), 
        });
    }
}

export default ChatAPI;
