import { host } from "../../constants/host";
import WebSocketService from "../../lib/socket";
import store from "../../lib/store";
import ChatAPI from "./api";
import { ChatData, ChatId, UserData } from "./type";
class ChatController {
    private chatApi: ChatAPI;
    private webSocketService: WebSocketService;

    constructor() {
        this.chatApi = new ChatAPI(host);
        this.webSocketService = new WebSocketService();
    }

    public getChats() {
        this.chatApi.getAllChats().then((chats) => {
            if (chats instanceof XMLHttpRequest) {
                const newData = JSON.parse(chats.response);
                store.set("data", newData);
            }
        })
            .catch((error) => {
                console.error("Error fetching chats:", error);
            });
    }

    public deleteChatController(data: ChatId) {
        this.chatApi.deleteChat(data).then((res) => {
            store.set("data", res);
            this.getChats();
        })
            .catch((error) => {
                console.error("Error delete chat:", error);
            });
    }

    public addChatController(data: Record<string, string>) {
        this.chatApi.addChat(data).then(() => {
            this.getChats();
        })
            .catch((error) => {
                console.error("Error adding chat:", error);
            });
    }

    public chatTokenController(data: ChatData) {
        this.chatApi.chatToken(data).then((res) => {
            if (res instanceof XMLHttpRequest) {
                const response = JSON.parse(res.responseText); 
                const token:string = response.token;
                chatController.connectToWebSocket(data, token); 
            }
        })
            .catch((error) => {
                console.error("Error token chat:", error);
            });
    }

    public methodSendWebSocketMessage(data: Record<string, string>) {
        if (this.webSocketService) {
            this.webSocketService.sendMessageToWebSocket(data.message);
        } else {
            console.error("WebSocketService is not initialized.");
        }
    }

    public addUserToChatController(userData:UserData) {
        this.chatApi.addUserToChat(userData)
            .then(() => {
                this.getChats();
            })
            .catch((error) => {
                console.error("Error adding user to chat:", error);
            });
    }

    public addChatAvatarToChatController(file:File, chatId:number) {
        this.chatApi.addChatAvatar(file,chatId)
            .then(() => {
                this.getChats();
            })
            .catch((error) => {
                console.error("Error adding image to chat:", error);
            });
    }

    public deleteUserToChatController(userData:UserData) {
        this.chatApi.deleteUserToChat(userData)
            .then(() => {
                this.getChats();
            })
            .catch((error) => {
                console.error("Error adding user to chat:", error);
            });
    }

    public connectToWebSocket(data: ChatData, token:string): void {
        this.webSocketService.connectToWebSocket(data,token);
    }

    public closeWebSocket(): void {
        this.webSocketService.closeWebSocket();
    }
}



export const chatController = new ChatController();
