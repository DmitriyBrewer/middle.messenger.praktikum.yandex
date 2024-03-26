import "./index.scss";

// export { default as ChatHeader } from "./index.hbs?raw";

import   ChatHeaderTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/test/block";
import ChatTitle from "../../chat-title";

class ChatHeader extends Block {
    constructor(props:BlockProps) {
        super("span", {...props,
            chatTitle: new ChatTitle({title: props.title})
        }); 
    }

    render() {
        return this.compile(ChatHeaderTemplate, {});
    }
}


export default ChatHeader;
