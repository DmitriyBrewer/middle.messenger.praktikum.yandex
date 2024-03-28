// TODO переписать шаблон под компноентный подход, добавить button
import "./index.scss";
import ChatSendTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Image from "../../../ui/img";
import InputComponent from "../../../ui/input";
import ButtonImage from "../../../ui/button-image";

class ChatSend extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            events:{submit:()=>{console.log("submit");}},
            file: new Image({
                alt:"file",
                src:"/assets/file.svg"
            }),
            input: new InputComponent({
                className:"chatSend__input",
                placeholder:"Сообщение" ,
                type:"text",
                id:"message",
                name:"message",
                onChange: ()=>{},
                blur: ()=>{}
            }),
            sendButton: new ButtonImage({
                className:"chatSend__send",
                type:"button",
                src:"/assets/arrow.svg",
                alt:"send" ,
                classNameImage:"chatSend__arrow"
            })
        }); 
    }

    render() {
        return this.compile(ChatSendTemplate, {});
    }
}

export default ChatSend;
