import "./index.scss";
import ChatItemTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Button from "../../../ui/button";
import { chatController } from "../../../pages/chat/controller";
import store from "../../../lib/store";
import Image from "../../../ui/img";
import { formatDate } from "../../../lib/formatDate";
import { formatAvatarUrl } from "../../../lib/formatAvatarUrl";
import ButtonImage from "../../../ui/button-image";
class ChatItem extends Block {
    constructor(props:BlockProps) {
        super("div",{...props, 
            events: {click:()=>{
                store.set("selectChat",this.props);
                chatController.chatTokenController({
                    title:this.props.title ? this.props.title as string : "",
                    avatar:null,
                    id:this.props.title  ?this.props.id as number  :"",
                    userId: (store.getState().userData as {id:number | undefined}).id ? (store.getState().userData as {id:number}).id  : ""
                });
            }},
            image: new Image({
                src: props.avatar ? formatAvatarUrl(props.avatar) : "/assets/avatar.png",
                alt:"chatAvatar",
                className:"chat__avatar"
            }),
            changeAvatar: new ButtonImage({
                events: {click:(e)=>{
                    e.stopPropagation();
                    chatController.deleteChatController({chatId: props.id as number });
                }},
                src:"/assets/union.svg",
                alt:"file",
                className: "chat__changeImage",
                width:20,
                height:20
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
