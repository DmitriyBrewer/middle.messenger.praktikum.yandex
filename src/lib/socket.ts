import { ChatData } from "../pages/chat/type";
import store from "./store";

interface Message {
    chat_id: number;
    content: string;
    file: string | null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}

class WebSocketService {
    private socket: WebSocket | null = null;

    connectToWebSocket(data: ChatData, token:string): void {
        const {  id, userId } = data;
        const socketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`;
        this.socket = new WebSocket(socketUrl);

        this.socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            this.updateMessagesInStore(message);
        });

        this.socket.addEventListener("open", () => {
            console.log("Соединение установлено");

            const message = {
                content: "0",
                type: "get old",
            };
            this.socket?.send(JSON.stringify(message));
        });

        this.socket.addEventListener("close", (event) => {
            if (event.wasClean) {
                console.log("Соединение закрыто корректно");
            } else {
                console.log("Соединение прервано");
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
    }

    closeWebSocket(): void {
        if (this.socket) {
            this.socket.close();
        }
    }

    private updateMessagesInStore(newMessage: Message) {
        const currentMessages = store.getState().messages || [];
        // TODO
        const updatedMessages = currentMessages.concat(newMessage);

        store.set("messages", updatedMessages);
    }

    sendMessageToWebSocket(message: string) {
        if (this.socket) {
            const newMessage = {
                content: message,
                type: "message",
            };
            this.socket.send(JSON.stringify(newMessage));
        }
    }
}

export default WebSocketService;
