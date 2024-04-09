import "./index.scss";
import ChatItemTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Button from "../../../ui/button";
import { chatController } from "../../../pages/chat/controller";
class ChatItem extends Block {
    constructor(props:BlockProps) {
        super("div",{...props, 
            events: {click:()=>{console.log(props);}},
            button: new Button({
                events: {click:(e)=>{
                    e.stopPropagation();
                    console.log("delete");
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
