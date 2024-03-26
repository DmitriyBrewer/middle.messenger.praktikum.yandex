import "./index.scss";
import ChatItemTemplate from "./index.hbs?raw";
import Block from "../../../lib/test/block";
class ChatItem extends Block {
    constructor(props) {
        super("div",props);
    }
    render() {
        return this.compile(ChatItemTemplate, {
            title:this.props.title, 
            message:this.props.message, 
            time:this.props.time,
            counter:this.props.counter
        });
    }
}

export default ChatItem;

// document.addEventListener("DOMContentLoaded", function () {
//     const chatsList = document.querySelectorAll(".chat");

//     chatsList.forEach((chat) => {
//         chat.addEventListener("click", function () {
//             chatsList.forEach((chat) => {
//                 chat.classList.remove("chat_active");
//             });

//             chat.classList.add("chat_active");
//             const chatMain = chat.querySelector(".chat__main");
//             const chatMinor = chat.querySelector(".chat__minor");

//             if (chatMain && chatMinor) {
//                 const chatTitle =
//                     chatMain.querySelector(".chatTitle")?.textContent ||
//                     "Нет данных";
//                 const chatMessage =
//                     chatMain.querySelector(".chat__message")?.textContent ||
//                     "Нет данных";
//                 const chatTime =
//                     chatMinor.querySelector(".chat__date")?.textContent ||
//                     "Нет данных";

//                 const chatWindowTemplate = renderTemplate("ChatWindow", {
//                     data: {
//                         title: chatTitle,
//                         message: chatMessage,
//                         date: chatTime,
//                     },
//                 });

//                 document.querySelector(".chatWindowWrapper")!.innerHTML =
//                     chatWindowTemplate;
//             } else {
//                 console.log("Ошибка: Не удалось найти данные чата");
//             }
//         });
//     });
// });

// export { default as ChatItem } from "./index.hbs?raw";
