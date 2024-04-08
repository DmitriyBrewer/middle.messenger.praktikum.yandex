// import store from "../../lib/store";
// import { addChats, deleteChat, getAllChats } from "./api";

// class ChatController {
//     public getChats() {
//         getAllChats().then((chats) => {
//             console.log(chats);
//             store.set("data",chats);
//         })
//             .catch((error) => {
//                 console.error("Error fetching chats:", error);
//             });
//     }

//     public deleteChatController(data:{chatId:string}) {
//         deleteChat(data).then((res) => {
//             console.log(res);
//             store.set("data",res);
//             chatController.getChats();
//         })
//             .catch((error) => {
//                 console.error("Error delete chats:", error);
//             });
//     }

//     public addChatController(data:Record<string,string>) {
//         addChats(data).then((res) => {
//             store.set("data",res);
//             chatController.getChats();
//         })
//             .catch((error) => {
//                 console.error("Error add chats:", error);
//             });
//     }
// } 

// export const chatController = new ChatController();
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
}

export const chatController = new ChatController();
