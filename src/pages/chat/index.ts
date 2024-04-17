import "./index.scss";
import Block, { BlockProps } from "../../lib/block";
import ChatPageTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";
import ChatWindow from "../../components/chat-window";
import { chatController } from "./controller";
import { authController } from "../auth/controller";
export class ChatPage extends Block {
    constructor(props:BlockProps) {
        super("div",props);

        authController.getUserInformation();
        chatController.getChats();

        this.children.sidebar = new Sidebar({}),
        this.children.window = new ChatWindow({});
    }

    render() {
        return this.compile(ChatPageTemplate, {sidebar: this.props.sidebar, window:this.props.window });
    }
}
