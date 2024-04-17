import "./index.scss";
import  ChatWindowTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import ChatHeader from "./chat-header";
import MessageList from "../message-list";
import ChatSend from "./chat-send";
class ChatWindow extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            chatHeader: new ChatHeader({}),
          
        }); 

        this.children.chatTexts= new MessageList({
            data: props.message
        }),
        this.children.chatSend= new ChatSend({});

        this.setProps(props);
    }

    render() {
        return this.compile(ChatWindowTemplate, {
            empty: !this.props.selectChat,
            date: this.props.time
        });
    }
}

export default ChatWindow;
