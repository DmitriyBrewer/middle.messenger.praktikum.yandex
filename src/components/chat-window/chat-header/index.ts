import "./index.scss";
import ChatHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import ChatTitle from "../../chat-title";
import ButtonImage from "../../../ui/button-image";
import Modal from "../../modal";
import NewUser from "../../new-user";
import InputComponent from "../../../ui/input";
import Button from "../../../ui/button";
import { chatController } from "../../../pages/chat/controller";
class ChatHeader extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            chatTitle: new ChatTitle({title: props.title}),
    
        }); 

        this.children.buttonImage = new ButtonImage({
            src:"/assets/menu.svg",
            alt:"menu",
            classNameImage:"chatHeader__menuImage",
            className:"chatHeader__menu",
            events: {click: ()=>{
                (this.children.modal as Block).show();
            }}
        }),

        this.children.modal = new Modal({
            closeModal: new ButtonImage({
                src:"/assets/close.svg",
                alt:"close",
                classNameImage:"closeButtonImage",
                className:"closeButton",
                events: {click: ()=>{
                    (this.children.modal as Block).hide();
                }}
            }),
            content: new NewUser({
                hideBlock: ()=>(this.children.modal as Block).hide(),
                api:(formData: Record<string, string>) => {
                    const userData = {
                        users: [0], // ID пользователя
                        chatId: 4,  // ID чата
                    };
                    
                    chatController.addUserToChatController(userData);
                    // chatController.addChatController(formData);
                },
                user: new InputComponent({
                    type: "text",
                    id: "users",
                    name: "users",
                    placeholder: "user",
                    helper: "Id user",
                    autocomplete: "username",
                    isRequired:true,
                }),
                chatId: new InputComponent({
                    type: "text",
                    id: "chatId",
                    name: "chatId",
                    placeholder: "chatId",
                    helper: "Id chatId",
                    autocomplete: "username",
                    isRequired:true,
                }),
                button: new Button({
                    text: "Добавить пользователя",
                    type:"submit",
                }),
            }),
            
        });
        this.props.buttonImage = this.children.buttonImage;
    }

    render() {
        return this.compile(ChatHeaderTemplate, {
            buttonImage: this.props.buttonImage
        });
    }
}

export default ChatHeader;
