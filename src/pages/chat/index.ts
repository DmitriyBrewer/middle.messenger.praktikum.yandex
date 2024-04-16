import "./index.scss";
import Block, { BlockProps } from "../../lib/block";
import ChatPageTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";
import ChatWindow from "../../components/chat-window";
import { chatController } from "./controller";
import store from "../../lib/store";
import { authController } from "../auth/controller";

export class ChatPage extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            sidebar:new Sidebar({data: []}),
            window: new ChatWindow({})
        });

        // TODO подумать как ещё получать userId
        if(!store.getState().userData) {
            authController.getUserInformation();
        }
        chatController.getChats();
    }

    render() {
        return this.compile(ChatPageTemplate, {sidebar: this.props.sidebar, window:this.props.window });
    }
}
