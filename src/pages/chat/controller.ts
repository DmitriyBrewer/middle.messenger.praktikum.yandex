import store from "../../lib/store";
import { deleteChat, getAllChats } from "./api";

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

    public deleteChatController(data:{chatId:string}) {
        deleteChat(data).then((res) => {
            console.log(res);
            store.set("data",(prev)=>{return ({...prev,k:"ss"});});
        })
            .catch((error) => {
                console.error("Error delete chats:", error);
            });
    }
} 

export const chatController = new ChatController();
