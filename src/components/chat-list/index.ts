import Block, { BlockProps } from "../../lib/block";
import ChatItem from "../sidebar/sidebar-item";
class ChatList extends Block {
    constructor(props: BlockProps) {
        super("span", props); 
        // if (!this.children) {
        //     this.children = {};
        // }
        // if (props.data && Array.isArray(props.data)) {
        //     console.log(props.data);
        //     this.children.list = props.data.map((itemProps: BlockProps) => new ChatItem(itemProps));
        //     this.props.list = this.children.list;
        // }
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(oldProps.data!==newProps.data) {
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
