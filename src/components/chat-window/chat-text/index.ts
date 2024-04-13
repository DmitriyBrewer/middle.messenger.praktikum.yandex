import "./index.scss";
import ChatTextTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";
class ChatText extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
    }

    render() {
        console.log(this);
        return this.compile(ChatTextTemplate, {
            content: this.props.content,
            date:this.props.content,
            my:this.props.user_id === this.props.userId,
            statusImage: this.props.content
        });
    }
}

export default ChatText;
