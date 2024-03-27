import "./index.scss";
import SidebarTemplate from "./index.hbs?raw";
import Block, {  BlockProps } from "../../lib/test/block";
import SearchFieldComponent from "./search-field";
import ChatItem from "./sidebar-item";

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

class Sidebar extends Block {
    constructor(props: BlockProps) {
        super("div", {
            ...props,
            events: props.events,
            search: new SearchFieldComponent({}),
            chats: new ChatList({
                data: props.data
            })
        });        
    }

    render() {
        return this.compile(SidebarTemplate, {});
    }
}

export default Sidebar;
