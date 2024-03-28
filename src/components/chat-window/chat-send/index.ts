import "./index.scss";
import ChatSendTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import Image from "../../../ui/img";
import InputComponent from "../../../ui/input";
import ButtonImage from "../../../ui/button-image";
import { isEmptyValue } from "../../../lib/validations/isEmptyValue";
import { validationField } from "../../../lib/validations/isValidLogin";
import { conditions } from "../../../constants/conditions";

class ChatSend extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            disabled:false,
            events:{
                submit: (event: Event) => {
                    event.preventDefault();
                    this.handleFormData((formDataObject) => {
                        console.log("Отправлено сообщение:", formDataObject);
                    });
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
                blur: (value: string) => {
                    const isValid = validationField(value, conditions.message.pattern);
                    (this.children.sendButton as Block).setProps({disabled:!isValid});
                    !isValid && console.log(conditions.message.errorText);
                },
            }),
            sendButton: new ButtonImage({
                className:"chatSend__send",
                type:"submit",
                src:"/assets/arrow.svg",
                alt:"send" ,
                classNameImage:"chatSend__arrow",
            })
        }); 
    }

    render() {
        return this.compile(ChatSendTemplate, {});
    }
}

export default ChatSend;
