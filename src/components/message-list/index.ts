import "./index.scss";
import  ChatTextListTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/test/block";
import ChatText from "../chat-window/chat-text";

class MessageList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        this.children.list = [];
        // TODO рушить пробелум типизации
        this.props.data.forEach((itemProps:BlockProps) => {
            const item = new ChatText(itemProps);
            this.children.list.push(item);
        });
        this.props.list = this.children.list;
        this.props.className = "chatLists";
    }

    render() {    
        return this.compile(ChatTextListTemplate, {});
    }
}

export default MessageList;
