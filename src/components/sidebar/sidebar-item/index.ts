import "./index.scss";
import ChatItemTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/test/block";
class ChatItem extends Block {
    constructor(props:BlockProps) {
        super("div",props);
    }
    render() {
        return this.compile(ChatItemTemplate, {
            title:this.props.title, 
            message:this.props.message, 
            time:this.props.time,
            counter:this.props.counter
        });
    }
}

export default ChatItem;
