import "./index.scss";
import   ChatTitleTemplate from "./index.hbs?raw";
import Block from "../../lib/test/block";

class ChatTitle extends Block {
    constructor(props) {
        super("span", props); 
    }

    render() {
        return this.compile(ChatTitleTemplate, {
            title:this.props.title
        });
    }
}


export default ChatTitle;
