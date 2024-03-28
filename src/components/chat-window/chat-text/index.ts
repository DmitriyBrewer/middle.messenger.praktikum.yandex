import "./index.scss";
import ChatTextTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/block";


class ChatText extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
    }

    render() {
        return this.compile(ChatTextTemplate, {
            message: this.props.message,
            date:this.props.date,
            my:this.props.my,
            statusImage: this.props.statusImage
        });
    }
}

export default ChatText;
