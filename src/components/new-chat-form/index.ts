import "./index.scss";
import   NewChatTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";


class NewChat extends Block {
    constructor(props:BlockProps) {
        super("form", props); 
    }

    render() {
        return this.compile(NewChatTemplate, {});
    }
}

export default NewChat;
