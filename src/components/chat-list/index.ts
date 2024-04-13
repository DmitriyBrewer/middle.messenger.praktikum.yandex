import Block, { BlockProps } from "../../lib/block";
import isEqual from "../../lib/isEqual";
import ChatItem from "../sidebar/sidebar-item";
class ChatList extends Block {
    constructor(props: BlockProps) {
        super("span", props); 
    }

    componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if (isEqual(oldProps,newProps)) {
            if (this.props.data && Array.isArray(this.props.data)) {
                this.children.list = this.props.data.map((itemProps: BlockProps) => new ChatItem(itemProps));
            }
        }
        return true;
    }

    render() {  
        return this.compile("{{{list}}}", {});
    }
}


export default ChatList;
