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


    connectToWebSocket(data: Record<string, string>): void {
        const { token } = data;
        const chatId = data.id;
        const userId = 4;
        console.log(store);
        console.log(data);
        const socketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
        this.socket = new WebSocket(socketUrl);

        this.socket.addEventListener("open", () => {
            console.log("Connection established");

            const message = {
                content: "My first message to the world!",
                type: "message",
            };
            this.socket.send(JSON.stringify(message));
        });

        this.socket.addEventListener("close", (event) => {
            if (event.wasClean) {
                console.log("Connection closed cleanly");
            } else {
                console.log("Connection interrupted");
            }

            console.log(`Code: ${event.code} | Reason: ${event.reason}`);
        });

        this.socket.addEventListener("message", (event) => {
            console.log("Received data:", event.data);
        });

        this.socket.addEventListener("error", (event) => {
            console.error("Error:", event.message);
        });
    }
}



export const chatController = new ChatController();
