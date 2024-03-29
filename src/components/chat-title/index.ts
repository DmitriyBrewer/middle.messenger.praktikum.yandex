import "./index.scss";
import   ChatTitleTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";

class ChatTitle extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
    }

    render() {
        return this.compile(ChatTitleTemplate, {props:this.props});
    }
}


export default ChatTitle;
