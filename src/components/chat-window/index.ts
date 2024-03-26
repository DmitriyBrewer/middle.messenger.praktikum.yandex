import "./index.scss";
import  ChatWindowTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/test/block";
import ChatHeader from "./chat-header";
import MessageList from "../message-list";

class ChatWindow extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            chatHeader: new ChatHeader({title: props.activeChat.title}),
            chatTexts: new MessageList({
                data:[
                    {
                        message: props.activeChat.message, 
                        my:true, 
                        date: props.activeChat.time
                    },
                    {
                        message: "Hello",  
                        date: props.activeChat.time
                    }
                ]
            })
        }); 
    }

    render() {
        console.log(this);
        return this.compile(ChatWindowTemplate, {
            empty: this.props.empty,
            date: this.props.activeChat.time
        });
    }
}


export default ChatWindow;
