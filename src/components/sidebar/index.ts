import "./index.scss";
import SidebarTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/test/block";
import SearchFieldComponent from "./search-field";
import ChatItem from "./sidebar-item";

class ChatList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        this.children.list = [];
        this.props.data.forEach((itemProps:BlockProps) => {
            const item = new ChatItem(itemProps);
            this.children.list.push(item);
        });
        this.props.list = this.children.list;

    }

    render() {    
        return this.compile("{{{list}}}", {});
    }
}
class Sidebar extends Block {
    constructor(props:BlockProps) {
        super("div",{
            ...props,
            events: props.events,
            search: new SearchFieldComponent({}),
            chats: new ChatList({
                data:props.data
            })
        });        
    }

    render() {
        console.log(this);
        return this.compile(SidebarTemplate, {});
    }

}

export default Sidebar;
