import "./index.scss";
import Block, { BlockProps } from "../../lib/block";
import ChatPageTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";
import ChatWindow from "../../components/chat-window";
import { mockChats } from "../../constants/mockChats";
import { chatController } from "./controller";

export class ChatPage extends Block {
    constructor(props:BlockProps) {
        super("div",{
            ...props,
            sidebar: new Sidebar({data: props.chats}),
            window: new ChatWindow({
                ...mockChats[0],
                empty: false
            })
        });

        chatController.getChats();
    }

    render() {
        console.log(this);
        return this.compile(ChatPageTemplate, {});
    }
}
