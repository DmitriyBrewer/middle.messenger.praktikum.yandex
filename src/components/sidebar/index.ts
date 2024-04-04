import "./index.scss";
import SidebarTemplate from "./index.hbs?raw";
import Block, {  BlockProps } from "../../lib/block";
import SearchFieldComponent from "./search-field";
import ChatList from "../chat-list";
import LinkComponent from "../../ui/link";
class Sidebar extends Block {
    constructor(props: BlockProps) {
        super("div", {
            ...props,
            events: props.events,
            link: new LinkComponent({
                href:"/settings",
                text:"Профиль",
                isRouter: true
            }),
            search: new SearchFieldComponent({}),
            chats: new ChatList({
                data: props.data
            }),
        });        
    }

    render() {
        return this.compile(SidebarTemplate, {});
    }
}

export default Sidebar;
