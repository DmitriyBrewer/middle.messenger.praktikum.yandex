import "./index.scss";
import ChatHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
import ChatTitle from "../../chat-title";
import ButtonImage from "../../../ui/button-image";
class ChatHeader extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            chatTitle: new ChatTitle({title: props.title}),
            buttonImage: new ButtonImage({
                src:"/assets/menu.svg",
                alt:"menu",
                classNameImage:"chatHeader__menuImage",
                className:"chatHeader__menu"
            })
        }); 
    }

    render() {
        return this.compile(ChatHeaderTemplate, {});
    }
}

export default ChatHeader;
