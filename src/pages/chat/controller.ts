import { host } from "../../constants/host";
import WebSocketService from "../../lib/socket";
import store from "../../lib/store";
import ChatAPI from "./api";

class ChatController {
    private chatApi: ChatAPI;
    private webSocketService: WebSocketService;

    constructor() {
        this.chatApi = new ChatAPI(host);
        this.webSocketService = new WebSocketService();
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

    public chatTokenController(data: Record<string, string>) {
        this.chatApi.chatToken(data).then((res) => {
            const response = JSON.parse(res.responseText); // Преобразуем JSON-строку в объект
            const token = response.token; // Получаем значение токена из объекта ответа
            console.log(token);
            chatController.connectToWebSocket({...data, token}); 
        })
            .catch((error) => {
                console.error("Error token chat:", error);
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

    public connectToWebSocket(data: Record<string, string>): void {
        this.webSocketService.connectToWebSocket(data);
    }

    public closeWebSocket(): void {
        this.webSocketService.closeWebSocket();
    }

    // connectToWebSocket(data: Record<string, string>): void {
    //     const { token, id, userId } = data;
    //     const socketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`;
    //     this.socket = new WebSocket(socketUrl);
    
    //     this.socket.addEventListener("open", () => {
    //         console.log("Connection established");
    
    //         const message = {
    //             content: "0", // Начинаем с нулевого сообщения
    //             type: "get old",
    //         };
    //         this.socket.send(JSON.stringify(message));
    
    //         document.querySelector(".chatSend__send").addEventListener("click", () => {
    //             console.log("click");
    //             const messageToSend = (document.querySelector("#message") as HTMLInputElement).value;
    //             const newMessage = {
    //                 content: messageToSend,
    //                 type: "message",
    //             };
    //             this.socket.send(JSON.stringify(newMessage)); 
    //         });
    //     });
    
    //     this.socket.addEventListener("close", (event) => {
    //         if (event.wasClean) {
    //             console.log("Connection closed cleanly");
    //         } else {
    //             console.log("Connection interrupted");
    //         }
    
    //         console.log(`Code: ${event.code} | Reason: ${event.reason}`);
    //     });
    
    //     this.socket.addEventListener("message", (event) => {
    //         store.set("messages", JSON.parse(event.data));
    //     });
    
    //     this.socket.addEventListener("error", (event) => {
    //         console.error("Error:", event.message);
    //     });
    // }
}



export const chatController = new ChatController();
