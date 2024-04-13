import "./index.scss";
import ChatItemTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Button from "../../../ui/button";
import { chatController } from "../../../pages/chat/controller";
import store from "../../../lib/store";
class ChatItem extends Block {
    constructor(props:BlockProps) {
        super("div",{...props, 
            events: {click:()=>{
                store.set("selectChat",this.props);
                console.log(this.props);
                chatController.chatTokenController({
                    title:this.props.title,
                    avatar:null,
                    id:this.props.id,
                });
            }},
            button: new Button({
                events: {click:(e)=>{
                    e.stopPropagation();
                    chatController.deleteChatController({chatId: props.id});
                }},
                text:"delete", 
                className:"chat__delete"
            })
        });
    }

    render() {
        return this.compile(ChatItemTemplate, {
            title:this.props.title, 
            message:this.props.last_message, 
            time:this.props.time,
            counter:this.props.unread_count,
            witchId: true
        });
    }
}

export default ChatItem;
