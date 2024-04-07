import "./index.scss";
import SidebarTemplate from "./index.hbs?raw";
import Block, {  BlockProps } from "../../lib/block";
import SearchFieldComponent from "./search-field";
import ChatList from "../chat-list";
import LinkComponent from "../../ui/link";
import Button from "../../ui/button";
import { chatController } from "../../pages/chat/controller";
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
                    chatController.addChatController({title: "NameChat"});
                }}
            }),
            search: new SearchFieldComponent({}),
            chats: new ChatList({}),
        }); 
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(oldProps.data!==newProps.data) {
            (this.children.chats as Block).setProps({data:this.props.data});
        }
        return true;
    }

    render() {
        return this.compile(SidebarTemplate, {});
    }
}

export default Sidebar;
