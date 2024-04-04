import "./index.scss";
import Block, { BlockProps } from "../../lib/block";
import ChatPageTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";
import ChatWindow from "../../components/chat-window";
import { mockChats } from "../../constants/mockChats";
import { getAllChats } from "./api";

const chats = getAllChats();
console.log(chats);

// const mock = [
//     {avatar: null,
//         created_by: 374,
//         id: 4025,
//         last_message: null,
//         title: "NameChat",
//         unread_count: 0
//     }
// ];

export class ChatPage extends Block {
    constructor(props:BlockProps) {
        super("div",{
            ...props,
            sidebar: new Sidebar({data: chats}),
            window: new ChatWindow({
                ...mockChats[0],
                empty: false
            })
        });
    }

    render() {
        return this.compile(ChatPageTemplate, {});
    }
}
