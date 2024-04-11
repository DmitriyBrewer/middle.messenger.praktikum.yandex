import { host } from "../../constants/host";
import store from "../../lib/store";
import ChatAPI from "./api";

class ChatController {
    private chatApi: ChatAPI;

    constructor() {
        this.chatApi = new ChatAPI(host);
    }

    public getChats() {
        this.chatApi.getAllChats().then((chats) => {
            store.set("data",  JSON.parse(chats.response));
        })
            .catch((error) => {
                console.error("Error fetching chats:", error);
            });
    }

    public deleteChatController(data: { chatId: string }) {
        this.chatApi.deleteChat(data).then((res) => {
            console.log(res);
            store.set("data", res);
            this.getChats();
        })
            .catch((error) => {
                console.error("Error delete chat:", error);
            });
    }

    public addChatController(data: Record<string, string>) {
        console.log(data);
        this.chatApi.addChat(data).then((res) => {
            store.set("data", res);
            this.getChats();
        })
            .catch((error) => {
                console.error("Error adding chat:", error);
            });
    }

    public addUserToChatController(userData) {
        this.chatApi.addUserToChat(userData)
            .then((response) => {
                console.log("User added to chat successfully:", response);
                this.getChats();
            })
            .catch((error) => {
                console.error("Error adding user to chat:", error);
            });
    }

    public deleteUserToChatController(userData) {
        this.chatApi.deleteUserToChat(userData)
            .then((response) => {
                console.log("User added to chat successfully:", response);
                this.getChats();
            })
            .catch((error) => {
                console.error("Error adding user to chat:", error);
            });
    }
}

export const chatController = new ChatController();
