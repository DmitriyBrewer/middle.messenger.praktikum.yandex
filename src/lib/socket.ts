import { ChatData } from "../pages/chat/type";
import { sanitizeInput } from "./sanitizeInput";
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

            const message = {
                content: "0",
                type: "get old",
            };
            this.socket?.send(JSON.stringify(message));

            this.socket && this.socket.addEventListener("message", (event) => {
                const messages = JSON.parse(event.data);
                store.set("messages", messages);
            });
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
        const sanitizedMessage = {
            chat_id: newMessage.chat_id,
            content: sanitizeInput(newMessage.content),
            file: newMessage.file,
            id: newMessage.id,
            is_read: newMessage.is_read,
            time: newMessage.time,
            type: sanitizeInput(newMessage.type),
            user_id: newMessage.user_id,
        };
    
        console.log(currentMessages);
        // eslint-disable-next-line
       // @ts-ignore не успеваю решить эту проблему типизации
        const updatedMessages = [...currentMessages, sanitizedMessage]; 
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
