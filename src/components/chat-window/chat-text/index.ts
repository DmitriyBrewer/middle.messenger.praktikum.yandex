import "./index.scss";
import ChatTextTemplate  from "./index.hbs?raw";
import Block from "../../../lib/test/block";


class ChatText extends Block {
    constructor(props) {
        super("span", props); 
    }

    render() {
        return this.compile(ChatTextTemplate, {
            message: this.props.message,
            date:this.props.date,
            my:this.props.my
        });
    }
}

export default ChatText;
