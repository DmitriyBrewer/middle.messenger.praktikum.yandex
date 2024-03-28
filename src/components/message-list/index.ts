import "./index.scss";
import  ChatTextListTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import ChatText from "../chat-window/chat-text";

class MessageList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        if (!this.children) {
            this.children = {};
        }
        if (props.data && Array.isArray(props.data)) {
            this.children.list = props.data.map((itemProps: BlockProps) => new ChatText(itemProps));
            this.props.list = this.children.list;
        }
        
        this.props.className = "chatLists";
    }

    render() {    
        return this.compile(ChatTextListTemplate, {});
    }
}

export default MessageList;
