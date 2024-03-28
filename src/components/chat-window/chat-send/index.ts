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
            events:{
                submit:(event:Event)=>{
                    event.preventDefault();
                    const formData = new FormData(this.element as HTMLFormElement);
                    const message = formData.get("message") as string;
                    console.log("Отправлено сообщение:", message);
                    const inputElement = this.element!.querySelector("input[name=\"message\"]") as HTMLInputElement;
                    if (inputElement) {
                        inputElement.value = "";
                    }
                }
            },
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
                pattern: ".+",
                isRequired:true,
                autocomplete:"off",
                patternMessage: "Поле сообщения не должно быть пустым!",
                blur:(value:string)=>{
                    if (value.trim() === "") {
                        console.log("Поле сообщения не должно быть пустым!");
                        this.setProps({disabled:true});
                    }
                },
                // oninvalid:(event) {
                //     event.target.setCustomValidity('Username should only contain lowercase letters. e.g. john');
                // }
            }),
            sendButton: new ButtonImage({
                className:"chatSend__send",
                type:"submit",
                src:"/assets/arrow.svg",
                alt:"send" ,
                classNameImage:"chatSend__arrow",
                disabled:props.disabled
            })
        }); 
    }

    render() {
        return this.compile(ChatSendTemplate, {});
    }
}

export default ChatSend;
