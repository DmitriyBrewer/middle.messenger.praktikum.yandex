import "./index.scss";
import  ChatWindowTemplate  from "./index.hbs?raw";
import Block from "../../lib/test/block";
import ChatHeader from "./chat-header";
import ChatText from "./chat-text";
import ChatTextList from "../message-list";
// class ChatTextList extends Block {
//     constructor(props) {
//         super("span", props); 
//         this.children.list = [];
//         this.props.data.forEach(itemProps => {
//             const item = new ChatText(itemProps);
//             this.children.list.push(item);
//         });
//         this.props.list = this.children.list;

//     }

//     render() {    
//         return this.compile("{{{list}}}", {});
//     }
// }

class ChatWindow extends Block {
    constructor(props) {
        super("span", {...props,
            chatHeader: new ChatHeader({title: props.activeChat.title}),
            // chatText: new ChatText({
            //     message: props.activeChat.message, 
            //     my:true, 
            //     date: props.activeChat.time
            // }),
            chatTexts: new ChatTextList({
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
            empty:false,
            date: this.props.activeChat.time
        });
    }
}


export default ChatWindow;
