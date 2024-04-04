import "./index.scss";
import SidebarTemplate from "./index.hbs?raw";
import Block, {  BlockProps } from "../../lib/block";
import SearchFieldComponent from "./search-field";
import ChatList from "../chat-list";
import LinkComponent from "../../ui/link";
import Button from "../../ui/button";
import { addChats } from "../../pages/chat/api";
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
            addChat: new Button({
                text:"Добавить чат",
                events: {click: ()=>{
                    addChats({title: "NameChat"});
                }}
            }),
            search: new SearchFieldComponent({}),
            chats: new ChatList({
                data: props.data
            }),
        });        
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        console.log(oldProps);
        return true;
    }

    render() {
        return this.compile(SidebarTemplate, {});
    }
}

export default Sidebar;
