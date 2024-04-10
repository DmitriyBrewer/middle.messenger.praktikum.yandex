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

    public addUserToChat(userData: Record<string, any>) {
        const usersRequest = {
            users: [Number(userData.users)],
            chatId: Number(userData.chatId)
        };

        console.log(JSON.stringify(usersRequest));

        return this.put(`${this.baseUrl}/api/v2/chats/users`, {
            method: "PUT",
            headers: ["Accept", "application/json"],
            body: JSON.stringify(usersRequest)
        });
    
        // return fetch(`${this.baseUrl}/api/v2/chats/users`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify(usersRequest),
        //     credentials: "include" 
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error("Something went wrong");
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         console.error("Error:", error);
        //     });
    }
}

export default ChatAPI;
