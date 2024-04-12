import "./index.scss";
import  ChatWindowTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import ChatHeader from "./chat-header";
import MessageList from "../message-list";
import ChatSend from "./chat-send";
import isEqual from "../../lib/isEqual";
class ChatWindow extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            chatHeader: new ChatHeader({}),
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
            }),
            chatSend: new ChatSend({})
        }); 
    }

    // TODO перерендер доленн быть при выборе чата
    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(oldProps.selectChat !== newProps.selectChat) {
            (this.children.chatHeader as Block).setProps({selectChat:this.props.selectChat});
            console.log("rerender");

        }
        return true;
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
