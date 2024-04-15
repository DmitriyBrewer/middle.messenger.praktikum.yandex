import "./index.scss";
import ChatItemTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Button from "../../../ui/button";
import { chatController } from "../../../pages/chat/controller";
import store from "../../../lib/store";
import Image from "../../../ui/img";
import { formatDate } from "../../../lib/formatDate";
class ChatItem extends Block {
    constructor(props:BlockProps) {
        super("div",{...props, 
            events: {click:()=>{
                store.set("selectChat",this.props);
                chatController.chatTokenController({
                    title:this.props.title ? this.props.title as string : "",
                    avatar:null,
                    id:this.props.title  ?this.props.id as number  :"",
                    userId: store.getState().userData.id
                });
            }},
            image: new Image({
                src:props.avatar ? `https://ya-praktikum.tech/api/v2/resources/${props.avatar.replaceAll("/", "%2F") }`: "/assets/avatar.png",
                alt:"chatAvatar",
                className:"chat__avatar"
            }),
            button: new Button({
                events: {click:(e)=>{
                    e.stopPropagation();
                    chatController.deleteChatController({chatId: props.id as number });
                }},
                text:"delete", 
                className:"chat__delete"
            })
        });
    }

    render() {
        console.log(this);
        return this.compile(ChatItemTemplate, {
            title:this.props.title, 
            message:this.props.last_message && (this.props.last_message as {content: string}).content && (this.props.last_message as {content: string}).content, 
            time:this.props.last_message && (this.props.last_message as  {time: string}).time && formatDate((this.props.last_message as {time: string}).time),
            counter:this.props.unread_count,
            witchId: true
        });
    }
}

export default ChatItem;
