import "./index.scss";
import  ChatWindowTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/test/block";
import ChatHeader from "./chat-header";
import MessageList from "../message-list";

class ChatWindow extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            chatHeader: new ChatHeader({title: props.title}),
            chatTexts: new MessageList({
                data:[
                    {
                        message: props.message, 
                        my:true, 
                        date: props.time
                    },
                    {
                        message: "Hello",  
                        date: props.time
                    }
                ]
            })
        }); 
    }

    render() {
        console.log(this);
        return this.compile(ChatWindowTemplate, {
            empty: this.props.empty,
            date: this.props.time
        });
    }
}


export default ChatWindow;
