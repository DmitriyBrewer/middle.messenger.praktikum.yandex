import "./index.scss";
import Block, { BlockProps } from "../../lib/test/block";
import ChatTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";
import ChatWindow from "../../components/chat-window";
import { mockChats } from "../../constants/mockChats";

class ChatPage extends Block {
    constructor(props:BlockProps) {
        super("div",{
            ...props,
            events: props.events,
            sidebar: new Sidebar({data: mockChats}),
            // TODO сделать полноценный выбор чата
            window: new ChatWindow({
                activeChat: mockChats[0],
                empty: false
            })
        });
    }

    render() {
        console.log(this);
        return this.compile(ChatTemplate, {});
    }

}

export default ChatPage;
