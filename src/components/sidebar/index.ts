import "./index.scss";
import SidebarTemplate from "./index.hbs?raw";
import Block, {  BlockProps } from "../../lib/block";
import SearchFieldComponent from "./search-field";
import ChatList from "../chat-list";
import LinkComponent from "../../ui/link";
import Button from "../../ui/button";
import Modal from "../modal";
import InputComponent from "../../ui/input";
import NewChat from "../new-chat-form";
import ButtonImage from "../../ui/button-image";
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
            chats: new ChatList({}),
        }); 

        this.children.addChat = new Button({
            text:"Добавить чат",
            events: {click: ()=>{
                (this.children.modal as Block).show();
            }}
        });
        
        this.children.modal = new Modal({
            closeModal: new ButtonImage({
                src:"/assets/close.svg",
                alt:"close",
                classNameImage:"closeButtonImage",
                className:"closeButton",
                events: {click: ()=>{
                    (this.children.modal as Block).hide();
                }}
            }),
            content: new NewChat({
                input: new InputComponent({
                    type: "text",
                    id: "newChat",
                    name: "chat",
                    placeholder: "Наименовение Чата",
                    helper: "Наименовение Чата",
                    autocomplete: "username",
                    isRequired:true,
                }),
                button: new Button({
                    text: "Добавить чат",
                    type:"submit",
                    // events: {click: ()=>{
                    //     (this.children.modal as Block).hide();
                    // }}
                }),
            }),
            
        });
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(oldProps.data!==newProps.data) {
            (this.children.chats as Block).setProps({data:this.props.data});
        }
        return true;
    }

    render() {
        console.log(this);
        return this.compile(SidebarTemplate, {});
    }
}

export default Sidebar;
