import "./index.scss";
import   NewChatTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import { chatController } from "../../pages/chat/controller";


class NewChat extends Block {
    constructor(props:BlockProps) {
        super("form", props); 
        this.props.events = {
            submit: (event: Event) => {
                event.preventDefault();
                this.handleFormData((formDataObject) => {
                    console.log("Отправлено сообщение:", formDataObject);
                    chatController.addChatController({title: formDataObject.chat});
                    (this.parent.children.modal as Block).hide();
                });
            }
        };
    }

 

    render() {
        return this.compile(NewChatTemplate, {});
    }
}

export default NewChat;
