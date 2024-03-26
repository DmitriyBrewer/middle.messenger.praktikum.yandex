import "./index.scss";
import   ChatTitleTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/test/block";

class ChatTitle extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
    }

    render() {
        return this.compile(ChatTitleTemplate, {
            title:this.props.title
        });
    }
}


export default ChatTitle;
