import Block, { BlockProps } from "../../lib/test/block";
import ChatItem from "../sidebar/sidebar-item";
class ChatList extends Block {
    constructor(props: BlockProps) {
        super("span", props); 
        if (!this.children) {
            this.children = {};
        }
        if (props.data && Array.isArray(props.data)) {
            this.children.list = props.data.map((itemProps: BlockProps) => new ChatItem(itemProps));
            this.props.list = this.children.list;
        }
    }

    render() {  
        return this.compile("{{{list}}}", {});
    }
}


export default ChatList;
