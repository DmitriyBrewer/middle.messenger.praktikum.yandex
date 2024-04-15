// import store from "./store";

// class WebSocketService {
//     private socket: WebSocket | null = null;

//     connectToWebSocket(data: Record<string, string>): void {
//         const { token, id, userId } = data;
//         const socketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`;
//         this.socket = new WebSocket(socketUrl);

//         this.socket.addEventListener("message", (event) => {
//             const messages = JSON.parse(event.data);
//             this.updateMessagesInStore(messages);
//         });

//         this.socket.addEventListener("open", () => {
//             console.log("Соединение установлено");

//             const message = {
//                 content: "0",
//                 type: "get old",
//             };
//             this.socket?.send(JSON.stringify(message));

//             // Добавьте обработчики событий и логику для отправки сообщений
//         });

//         this.socket.addEventListener("close", (event) => {
//             if (event.wasClean) {
//                 console.log("Соединение закрыто корректно");
//             } else {
//                 console.log("Соединение прервано");
//             }

//             console.log(`Код: ${event.code} | Причина: ${event.reason}`);
//         });

//         // Добавьте обработчик события для приема сообщений
//     }

//     closeWebSocket(): void {
//         if (this.socket) {
//             this.socket.close();
//         }
//     }

//     private updateMessagesInStore(messages: any) {
//         // const currentMessages = store.getState().messages || [];
//         // const updatedMessages = [...currentMessages, ...messages];
//         store.set("messages", messages);
//     }


//     sendMessageToWebSocket(message: string) {
//         if (this.socket) {
//             const newMessage = {
//                 content: message,
//                 type: "message",
//             };
//             this.socket.send(JSON.stringify(newMessage));
//         }
//     }
// }

// export default WebSocketService; 
import store from "./store";

class WebSocketService {
    private socket: WebSocket | null = null;

    connectToWebSocket(data: Record<string, string>): void {
        const { token, id, userId } = data;
        const socketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`;
        this.socket = new WebSocket(socketUrl);

        this.socket.addEventListener("message", (event) => {
            const messages = JSON.parse(event.data);
            this.updateMessagesInStore(messages);
        });

        this.socket.addEventListener("open", () => {
            console.log("Соединение установлено");

            const message = {
                content: "0",
                type: "get old",
            };
            this.socket?.send(JSON.stringify(message));

            // Теперь можно безопасно отправлять сообщения
            this.sendMessageToWebSocket("Пример сообщения для отправки");
        });

        this.socket.addEventListener("close", (event) => {
            if (event.wasClean) {
                console.log("Соединение закрыто корректно");
            } else {
                console.log("Соединение прервано");
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        // Добавьте обработчик события для приема сообщений
    }

    closeWebSocket(): void {
        if (this.socket) {
            this.socket.close();
        }
    }

    private updateMessagesInStore(messages: any) {
        const currentMessages = store.getState().messages || [];
        const updatedMessages = [...currentMessages, ...messages];
        store.set("messages", updatedMessages);
    }

    private sendMessageToWebSocket(message: string) {
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
