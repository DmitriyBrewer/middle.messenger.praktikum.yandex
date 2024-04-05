import store from "../../lib/store";
import { getAllChats } from "./api";

class ChatController {
    public getChats() {
        getAllChats().then((chats) => {
            console.log(chats);
            store.set("data",chats);
        })
            .catch((error) => {
                console.error("Error fetching chats:", error);
            });
    }
} 

export const chatController = new ChatController();
