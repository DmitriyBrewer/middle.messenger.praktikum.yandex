import "./index.scss";
import  ChatTextListTemplate  from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import ChatText from "../chat-window/chat-text";
import isEqual from "../../lib/isEqual";
class MessageList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        this.props.className = "chatLists";
    }

    componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if (isEqual(oldProps,newProps)) {
            if (this.props.messages && Array.isArray(this.props.messages)) {
                this.children.list = this.props.messages.map((itemProps: BlockProps) => new ChatText({...itemProps, userId: newProps.userData.id}));
            }
        }
        return true;
    }

    render() {    
        // console.log(this.props);
        return this.compile(ChatTextListTemplate, {});
    }
}

export default MessageList;
