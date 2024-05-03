import  ChatMenuItemTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";


class ChatMenuItem extends Block {
    constructor(props: BlockProps) {
        super("div", props);
    }

    render() {
        return this.compile(ChatMenuItemTemplate, {});
    }
}

export default ChatMenuItem;
