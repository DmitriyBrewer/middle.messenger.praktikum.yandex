import "./index.scss";
// export { default as ChatWindow } from "./index.hbs?raw";
import  ChatWindowTemplate  from "./index.hbs?raw";
import Block from "../../lib/test/block";
import ChatHeader from "./chat-header";
import ChatText from "./chat-text";

class ChatWindow extends Block {
    constructor(props) {
        super("span", {...props,
            chatHeader: new ChatHeader({title: props.activeChat.title}),
            chatText: new ChatText({
                message: props.activeChat.message, 
                my:true, 
                date: props.activeChat.time
            })
        }); 
    }

    render() {
        console.log(this);
        return this.compile(ChatWindowTemplate, {
            empty:false,
            date: this.props.activeChat.time
        });
    }
}


export default ChatWindow;
