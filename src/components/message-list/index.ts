import "./index.scss";
import  ChatTextListTemplate  from "./index.hbs?raw";
import Block from "../../lib/test/block";
import ChatText from "../chat-window/chat-text";

class MessageList extends Block {
    constructor(props) {
        super("span", props); 
        this.children.list = [];
        this.props.data.forEach(itemProps => {
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
