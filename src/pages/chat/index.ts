import "./index.scss";
import Block, { BlockProps } from "../../lib/block";
import ChatPageTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";
import ChatWindow from "../../components/chat-window";
import { chatController } from "./controller";

export class ChatPage extends Block {
    constructor(props:BlockProps) {
        super("div",props);

        chatController.getChats();
        this.children.sidebar = new Sidebar({data: []});
        this.children.window = new ChatWindow({});

    }

    render() {
        return this.compile(ChatPageTemplate, {sidebar: this.props.sidebar, window:this.props.window });
    }
}
